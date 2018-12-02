package main

import(
	"fmt"
	"net/http"	
) 

func main() {
	http.Handle("/static/",http.StripPrefix("/static/",http.FileServer(http.Dir("static"))))
	http.HandleFunc("/",index)
	fmt.Println("Server Run @ port 3000")
	http.ListenAndServe(":3000",nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w,r,"index.html")
}