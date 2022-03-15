package internal

type LoginData struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignUpData struct {
	DisplayName string `json:"display_name"`
	LoginData
}
