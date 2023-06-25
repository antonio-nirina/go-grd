package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	_ "sync"
	"time"

	"github.com/gin-gonic/gin"
	"todo.cli/model"
)

type tarification struct {
	Type              string
	Constructeur      string
	Reference         string
	Prix_de_vente_Net string
	Nom_Remise        string
	Remise            string
	Markup            string
}

func ImportTarification(c *gin.Context) {
	// accessToken := ""
	start := time.Now()
	defer func() {
		fmt.Println("Execution Time: ", time.Since(start).Seconds())
	}()
	var requestBody []tarification
	var response []model.AtlasProduct
	ch := make(chan *model.AtlasProduct)
	if err := c.BindJSON(&requestBody); err != nil {
		log.Fatal(err.Error())
	}
	url := "https://recette.atlas.econocom.com/GetProduct?apiKey=ce569bc9-325d-424c-8078-4bfdc78eb6b2"
	access := HttpAccess()
	for _, item := range requestBody {
		go func(item tarification) {
			if item.Type == "P" {
				url += "&manufacturerCode=" + item.Constructeur + "&skuManufacturer=" + item.Reference
				request, err := http.NewRequest("GET", url, nil)
				if err != nil {
					log.Fatal(err.Error())
				}
				// request.Header.Set("Authorization", "Bearer "+accessToken)
				request.Header.Set("Content-Type", "application/json")
				resp, err := access.client.Do(request)
				if err != nil {
					log.Fatal(fmt.Sprintf("%v", err))
				}
				defer resp.Body.Close()
				atlasResp, err := ioutil.ReadAll(resp.Body)
				atlasModel := &model.AtlasProduct{}
				err = json.Unmarshal(atlasResp, atlasModel)
				if err != nil {
					fmt.Println(string(atlasResp))
					log.Fatal(fmt.Sprintf("%v", err))
				}
				ch <- atlasModel
			}
		}(item)
	}

	for i := 0; i < len(requestBody); i++ {
		if requestBody[i].Type == "P" {
			resp := <-ch
			response = append(response, *resp)
		}
	}

	c.JSON(http.StatusOK, response)
}
