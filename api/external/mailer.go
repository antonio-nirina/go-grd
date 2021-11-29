package external

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	mailjet "github.com/mailjet/mailjet-apiv3-go/v3"
)

type ToMailer struct {
	Email       string
	Firstname   string 
	Lastname    string 
    Subject     string 
    Message     string 
}

func (mailer *ToMailer) InitialeMailjet() (bool,error) {
	err := godotenv.Load()
	
	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}
	
	mailjetClient := mailjet.NewMailjetClient(os.Getenv("MJ_APIKEY_PUBLIC"), os.Getenv("MJ_APIKEY_PRIVATE"))
	messagesInfo := []mailjet.InfoMessagesV31 {
		mailjet.InfoMessagesV31{
			From: &mailjet.RecipientV31{
				Email: os.Getenv("USER_EMAIL"),
				Name: "Go grind",
			},
			To: &mailjet.RecipientsV31{
				mailjet.RecipientV31 {
					Email:mailer.Email,
					Name: fmt.Sprintf("%s%s", mailer.Firstname, mailer.Lastname),
				},
			},
			Subject: mailer.Subject,
			TextPart: "",
			HTMLPart: mailer.Message,
		},
	}
	messages := mailjet.MessagesV31{Info: messagesInfo }
	res, err := mailjetClient.SendMailV31(&messages)

	if err != nil {
		return false,err
	}

	fmt.Println(res)
	return true,nil
}

func (e *ToMailer) Sender (data map[string]string) (bool,error) {
	err := godotenv.Load()
	
	if err != nil {
		Logger(fmt.Sprintf("%v", err))
	}
	
    uri := fmt.Sprintf("%s%s%s",os.Getenv("REDIRECT_URI"),"/update-password?token=",data["token"])
	mailjetClient := mailjet.NewMailjetClient(os.Getenv("MJ_APIKEY_PUBLIC"), os.Getenv("MJ_APIKEY_PRIVATE"))

	messagesInfo := []mailjet.InfoMessagesV31 {
		mailjet.InfoMessagesV31{
			From: &mailjet.RecipientV31{
				Email: os.Getenv("USER_EMAIL"),
				Name: "Grind",
			},
			To: &mailjet.RecipientsV31{
				mailjet.RecipientV31 {
					Email:e.Email,
					Name: fmt.Sprintf("%s%s", e.Lastname, e.Lastname),
				},
			},
			Subject: e.Subject,
			TextPart: "",
			HTMLPart: "<p>"+e.Message+"</p><p><a href="+uri+">"+data["msg"]+"</a></p>",
		},
	}
	messages := mailjet.MessagesV31{Info: messagesInfo }
	res, err := mailjetClient.SendMailV31(&messages)
	if err != nil {
		return false,err
	}
	
	fmt.Println(res)
	
	return true,nil
}