package auth_repository

type UserData struct {
	ID          int64  `json:"id"`
	DisplayName string `json:"display_name"`
	Username    string `json:"username"`
	Password    string `json:"password"`
}
