let alertDiv = document.getElementById('error-alert');
let closeBtn = document.getElementById('closeBtn');
let btnDiv = document.getElementById('btn-div')
let video = document.querySelector('video');
let canvas = document.querySelector('canvas')
let image = document.querySelector('img')
let filterDiv = document.querySelector('#filters')

const filters = [
    "grayscale",
    "sepia",
    "blur",
    "brightness",
    "contrast",
    "hue-rotate",
    "hue-rotate2",
    "hue-rotate3",
    "saturate",
    "invert",
    "",
  ];
const displayTypes = [
    { 
        name : 'HD',
        constrain : {
            video: { width: { min: 400 }, height: { min: 350 } },
            audio : {'echoCancellation' : true}
        },
    },
    {
        name : 'VGA',
        constrain : {
            video: { width: { exact: 400 }, height: { exact: 300 } },
            audio : {'echoCancellation' : true}
        }
    }
]

const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
}
// const openDevice = async() => {
//     return navigator.mediaDevices.enumerateDevices()
// }
    const openstream = (constraints) => {
        video.srcObject = null
        openMediaDevices(constraints).then(stream => {
            
        // Older browsers may not have srcObject
        if ("srcObject" in video) {
            console.log('i got srcObject')
          video.srcObject = stream;
        } else {
           
          // Avoid using this in new browsers, as it is going away.
          video.src = window.URL.createObjectURL(stream);
          console.log(video.src)
        }
        video.onloadedmetadata = function(e) {
          video.play();
        }
        filters.forEach(filter => {
            let btn = document.createElement('button')
            
            btn.className = filter
            btn.innerText = filter? filter.toUpperCase() : 'NORMAL'
            console.log(filter? filter : ' ')
            btn.addEventListener('click', e =>{
                video.className = filter
                console.log(video)
            })
            filterDiv.append(btn)
        })
        })
        .catch(error =>{
            console.error('Error accessing media devices.', error)
            alertDiv.removeAttribute('hidden')
        }) 
    }
    
// navigator.mediaDevices.addEventListener('devicechange', e => {
//     openDevice().then(result => console.log(result))
// })
video.onclick = function () {
    console.log('vode clisked')
canvas.height = video.videoHeight
canvas.width = video.videoWidth
canvas.getContext('2d').drawImage(video, 0, 0);
//image.src = canvas.toDataURL('image/webp')
}
closeBtn.addEventListener('click', e => {
    alertDiv.setAttribute('hidden', true)
})
displayTypes.forEach(disp => {
    const btn = document.createElement('button')
    btn.classList.add('displayBtn')
    btn.innerText = disp.name;
    btn.addEventListener('click', e => openstream(disp.constrain) ) 
    btnDiv.append(btn)
})