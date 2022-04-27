let timer = null;
let timespent = 0;
let neighbours = [

        [0, 2, 4, 0],
        [0, 3, 5, 1],
        [0, 0, 6, 2],
    
        [1, 5, 7, 0],
        [2, 6, 8, 4],
        [3, 0, 9, 5],
    
        [4, 8, 10, 0],
        [5, 9, 11, 7],
        [6, 0, 12, 8],
    
        [7, 11, 0, 0],
        [8, 12, 0, 10],
        [9, 0, 0, 11]
    ];
    let emptyimag = "images/12.jpg";
    let movect = 0;
    
    let images = new Array
        (
            "images/1.jpg",
            "images/2.jpg",        
            "images/3.jpg",
            "images/4.jpg",
            "images/5.jpg",
            "images/6.jpg",
            "images/7.jpg",
            "images/8.jpg",
            "images/9.jpg",
            "images/10.jpg",
            "images/11.jpg",
            "images/12.jpg"
        );
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
        
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }
        
        start = () => {
            if(document.getElementById("btnStart").innerText == "START")
            {
                images = shuffle(images);
                for (let i = 1; i <= 12; i++) {
                    document.getElementById("img" + i).src = images[i - 1];
                }
                timespent = 0;
                timer = setInterval(timeClicked, 1000);
                document.getElementById("btnStart").innerText = "PAUSE";
            }
            else if(document.getElementById("btnStart").innerText == "PAUSE")
            {
                document.getElementById("btnStart").innerText = "RESUME";
                clearInterval(timer);
            }
            else if(document.getElementById("btnStart").innerText == "RESUME")
            {
                timer = setInterval(timeClicked, 1000);
                document.getElementById("btnStart").innerText = "PAUSE";
            }
        }

        stop = () =>{
            clearInterval(timer);
            document.getElementById("btnStart").innerText = "START"; 
            
            for (let i = 1; i <= 12; i++) {
                document.getElementById("img" + i).src = "images/" + i + ".jpg";
            }
        }
        
            timeClicked = ()=>{
                timespent++;
                let seconds = timespent;
                let hours = parseInt(seconds / 3600);
                seconds = seconds % 3600;
                let minutes = parseInt(seconds / 60);
                seconds = parseInt(seconds % 60);
                document.getElementById("time").innerText = hours.toString().padStart(2, 0) + ":" + minutes.toString().padStart(2, 0) + ":" + seconds.toString().padStart(2, 0);
            }
            // setTimeout(start, 4000);
        
        move = (direction) =>{
            if(document.getElementById("btnStart").innerText == "PAUSE")
            {
                let emptyid = 0;
                for(let i = 1; i <= 12; i++)
                {
                let src = document.getElementById("img" + i).src;
                if(src.includes(emptyimag))
                {
                    emptyid = i;
                    break;
                }      
                }
                let swapwith = 0;
                if(direction == "up")
                    swapwith = neighbours[emptyid - 1][2];
                else if(direction == "right")
                    swapwith = neighbours[emptyid - 1][3];
                else if(direction == "down")
                    swapwith = neighbours[emptyid - 1][0];
                else if(direction == "left")
                    swapwith = neighbours[emptyid - 1][1];
            
                if(swapwith != 0)
                {
                    let path = document.getElementById("img" + emptyid).src;
                    document.getElementById("img" + emptyid).src = document.getElementById("img" + swapwith).src;
                    document.getElementById("img" + swapwith).src = path;

                    let finished = true;
                    for(let i = 1; i <=12; i++)
                    {
                        let src = document.getElementById("img" + i).src;
                        let no = src.substring(src.lastIndexOf("/") + 1).replace(".jpg", "");
                        if(i != no)
                        {
                            finished = false;
                            break;
                        }
                    }
                    if(finished)
                    {
                        stop();
                        alert("Congratulations");
                    }

                }  
                movect++;
                let ct = document.getElementById("count");
                ct.innerText = movect;  
            }
        }

        logKey = () =>{
            if(event.keyCode == 37)
            {
                move("left");
            }
            else if(event.keyCode == 38)
            {
                move("up");
            }
            else if(event.keyCode == 39)
            {
                move("right");
            }
            else if(event.keyCode == 40)
            {
                move("down");
            }
        }
        
        document.addEventListener('keydown', logKey);

        
        
        
        
        
        