package main

import (
	"github.com/gin-gonic/gin"
	"github.com/volatiletech/null/v8"
	"net/http"
	"sync"
	"time"
)

type Ping struct {
	Pong null.Bool `json:"pong"`
}

type Policy struct {
	IsInitialized null.Bool `json:"is_initialized"`
	IsAccepted    null.Bool `json:"is_accepted"`
}

type Info struct {
	FirmwareName    null.String `json:"firmware_name"`
	FirmwareVersion null.String `json:"firmware_version"`
	ApMode          null.Bool   `json:"ap_mode"`
	StaMode         null.Bool   `json:"sta_mode"`
	ApMac           null.String `json:"ap_mac"`
	StaMac          null.String `json:"sta_mac"`
	StaIp           null.String `json:"sta_ip"`
}

type HueRange struct {
	From    null.Int `json:"from"`
	To      null.Int `json:"to"`
	Section null.Int `json:"section"`
}

type Update struct {
	FirmwareVersion null.String `json:"firmware_version"`
	ChangeList      null.String `json:"change_list"`
}

type LedConfig struct {
	ModeIndex  null.Int `json:"mode_index"`
	Brightness null.Int `json:"brightness"`
	Speed      null.Int `json:"speed"`
	Width      null.Int `json:"width"`
	HueRange   *HueRange `json:"hue_range"`
	LedCount null.Int `json:"led_count"`
}

type NetworkConfig struct {
	ApSsid      null.String `json:"ap_ssid"`
	ApPassword  null.String `json:"ap_password"`
	StaSsid     null.String `json:"sta_ssid"`
	StaPassword null.String `json:"sta_password"`
}

type UpdateCheck struct {
	Found            null.Bool   `json:"found"`
	ErrorDescription null.String `json:"error_description"`
	Updates          *[]Update `json:"updates"`
}

var ping = Ping{
	Pong: null.Bool{true, true},
}

var policy = Policy{
	IsInitialized: null.Bool{false, true},
	IsAccepted:    null.Bool{false, false},
}

var info = Info{
	FirmwareName:    null.String{"Strichka Firmware Stub", true},
	FirmwareVersion: null.String{"0.0.0", true},
	ApMode:          null.Bool{true, true},
	StaMode:         null.Bool{false, true},
	ApMac:           null.String{"11:22:33:44:55:66", true},
	StaMac:          null.String{"11:22:33:44:55:67", true},
	StaIp:           null.String{"0.0.0.0", true},
}

var ledConfig = LedConfig{
	ModeIndex:  null.Int{0, true},
	Brightness: null.Int{255, true},
	Speed:      null.Int{65535, true},
	Width:      null.Int{65535, true},
	HueRange: &HueRange{
		From:    null.Int{0, true},
		To:      null.Int{255, true},
		Section: null.Int{0, true},
	},
	LedCount: null.Int{100, true},
}

var networkConfig = NetworkConfig{
	ApSsid:      null.String{"test_ap_ssid", true},
	ApPassword:  null.String{"test_ap_password", true},
	StaSsid:     null.String{"", false},
	StaPassword: null.String{"", false},
}

var updateCheck = UpdateCheck{
	Found:            null.Bool{true, true},
	ErrorDescription: null.String{"", false},
	Updates:          &[]Update{{
		FirmwareVersion: null.String{"0.0.1", true},
		ChangeList:      null.String{"update!", true},
	}},
}

var resetMutex = sync.Mutex{}

func GetFile(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	var request = struct {
		Filename string
	}{}
	err := ctx.ShouldBindUri(&request)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}
	ctx.File("./static/" + request.Filename)
}

func GetPing(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	ctx.JSON(http.StatusOK, ping)
}

func GetPolicy(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	ctx.JSON(http.StatusOK, policy)
}

func PutPolicy(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()

	var newPolicy Policy
	err := ctx.ShouldBindJSON(&newPolicy)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}

	policy = newPolicy
}

func GetInfo(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	ctx.JSON(http.StatusOK, info)
}

func GetLedConfig(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	ctx.JSON(http.StatusOK, ledConfig)
}

func PatchLedConfig(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()

	var newLedConfig LedConfig
	err := ctx.ShouldBindJSON(&newLedConfig)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}

	if newLedConfig.ModeIndex.Valid {
		ledConfig.ModeIndex = newLedConfig.ModeIndex
	}

	if newLedConfig.Brightness.Valid {
		ledConfig.Brightness = newLedConfig.Brightness
	}

	if newLedConfig.Speed.Valid {
		ledConfig.Speed = newLedConfig.Speed
	}

	if newLedConfig.Width.Valid {
		ledConfig.Width = newLedConfig.Width
	}

	if newLedConfig.LedCount.Valid {
		ledConfig.LedCount = newLedConfig.LedCount
	}

	if newLedConfig.HueRange != nil {
		if newLedConfig.HueRange.From.Valid {
			ledConfig.HueRange.From = newLedConfig.HueRange.From
		}
		if newLedConfig.HueRange.To.Valid {
			ledConfig.HueRange.To = newLedConfig.HueRange.To
		}
		if newLedConfig.HueRange.Section.Valid {
			ledConfig.HueRange.Section = newLedConfig.HueRange.Section
		}
	}
}

func GetNetworkConfig(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	ctx.JSON(http.StatusOK, networkConfig)
}

func PutNetworkConfig(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()

	var newNetworkConfig NetworkConfig
	err := ctx.ShouldBindJSON(&newNetworkConfig)
	if err != nil {
		ctx.String(http.StatusBadRequest, err.Error())
	}

	networkConfig = newNetworkConfig
	time.Sleep(5 * time.Second)
}

func GetUpdateCheck(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	ctx.JSON(http.StatusOK, updateCheck)
}

func GetUpdatePerform(ctx *gin.Context) {
	resetMutex.Lock()
	defer resetMutex.Unlock()
	time.Sleep(10 * time.Second)
}

func CacheMiddleware(ctx *gin.Context) {
	ctx.Header("Cache-Control", "no-cache, no-store, must-revalidate")
	ctx.Header("Pragma", "no-cache")
	ctx.Header("Expires", "0")
}

func main() {
	router := gin.New()

	router.Use(CacheMiddleware)

	root := router.Group("")
	root.GET("/static/*Filename", GetFile)
	root.GET("/ping", GetPing)
	root.GET("/policy", GetPolicy)
	root.PUT("/policy", PutPolicy)
	root.GET("/info", GetInfo)

	led := root.Group("/led")
	led.GET("/config", GetLedConfig)
	led.PATCH("/config", PatchLedConfig)

	network := root.Group("/network")
	network.GET("/config", GetNetworkConfig)
	network.PUT("/config", PutNetworkConfig)

	update := root.Group("/update")
	update.GET("/check", GetUpdateCheck)
	update.GET("/perform", GetUpdatePerform)

	router.Run(":8080")
}
