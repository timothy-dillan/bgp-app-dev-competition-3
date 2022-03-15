package auth_repository

type UserData struct {
	DisplayName string `json:"display_name"`
	Username    string `json:"username"`
	Password    string `json:"password"`
}
