package customhandlers

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

type lineNotifyResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

// LineNotifyHandler is for 오늘뭐먹지.
func LineNotifyHandler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method)
	if r.Method != "POST" {
		w.WriteHeader(403)
		w.Write([]byte("403 Bad Request"))
		return
	}

	data := url.Values{}
	data.Set("message", "\n안녕하세요, 점심뭐먹지 봇입니다 😀\n이제 점심 메뉴를 골라드릴 수 있겠네요.\n토큰을 제출하시면 내일부터 알림을 드릴게요!")

	reqBody := strings.NewReader(data.Encode())

	req, err := http.NewRequest("POST", "https://notify-api.line.me/api/notify", reqBody)
	if err != nil {
		panic(err)
	}

	token := r.FormValue("token")
	log.Println("(lineNotifyHandler) Received token: ", token)

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Authorization", "Bearer "+token)

	// Client객체에서 Request 실행
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// Response 체크.
	respBody, err := ioutil.ReadAll(resp.Body)

	var lineResponse lineNotifyResponse
	marsErr := json.Unmarshal(respBody, &lineResponse)
	log.Println("marsErr: ", marsErr)
	log.Println("response status: ", lineResponse)

	if err == nil {
		w.WriteHeader(200)
		str := "<html><script language='JavaScript'>"
		if lineResponse.Status != 200 {
			str += "alert('" + strconv.Itoa(lineResponse.Status) + " : " + lineResponse.Message + "');"
		}
		str += "window.open('','_self').close();</script></html>"
		w.Write([]byte(str))
		log.Println("(lineNotifyHandler)", str)
	} else {
		w.WriteHeader(400)
		w.Write([]byte(err.Error()))
		log.Println("(lineNotifyHandler) Error: ", err)
	}
	return
}
