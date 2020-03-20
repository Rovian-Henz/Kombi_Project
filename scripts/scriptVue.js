const mediaDevices = navigator.mediaDevices;

function GetMediaDevices() {
    return mediaDevices;
}

const vm = new Vue({
    el: "#app",
    data: {
        teste: "teste vue",
        WithCamera: true,
        VideoTag: "#video"
    },
    methods: {
        GetUserMedia() {
            mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                .then(stream => {
                    this.BindDevice(stream, this.GetTagVideo())
                })
                .catch(err0r => {
                    this.WithCamera = false;
                });
        },
        BindDevice(stream, element) {
            element.srcObject = stream;
        },
        GetTagVideo() {
            return document.querySelector(this.VideoTag);
        }
    },
    mounted() {
        if (GetMediaDevices()) {
            this.GetUserMedia();
        }
    },
})