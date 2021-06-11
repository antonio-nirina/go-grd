package handler

import (
	"github.com/thoussei/antonio/main/front-office/api/user/entity"
)

func (u *userUsecase)AddFriend(req *entity.Friends) (interface{}, error) {
	result, err := u.userRepository.AddFriend(req)

	if err != nil {
		return nil, err
	}

	return result, nil
}