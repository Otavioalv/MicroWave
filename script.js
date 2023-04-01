function abrir(){
    var porta = document.getElementById("iFechado").style;
    
    if (porta.right === "400px"){
        sound(1, true);
        porta.right = "auto";
        porta.animation = "fechar 0.6s";
        canc = 0;
    }
    else{
        sound(0, true);
        porta.right = "400px";
        porta.animation = "abrir 1s";
        porta.animationFillMode = "forwards";
        canc = 1;    
    }
};


btnn = 1;
//NUMERO DO TEMPORIZADOR    
function number_time(num){
    var timer = document.getElementById("iTimer");
    
    // console.log(num);
    if(num != 30 && (timer.value.length < 5 || timer.value == "00:00") && badd){
        btnn = 0;
        if(timer.value == " " || timer.value == "00:00"){
            timer.value = null;
            // console.log("igual a null");
        }

        if(timer.value.length == 2){
            timer.value = timer.value.slice(0, 1) + ":" + timer.value.slice(1)+num;
        }
        else if(timer.value.length == 4){
            // console.log("Deu 4: ", timer.value);
            var array = timer.value.split("");
            array.splice(1, 1);
            timer.value = array.join("");
            timer.value =  timer.value.slice(0, 2) + ":" + timer.value.slice(2, 4);
            timer.value += num;
            // console.log("num: ", num);
            //console.log("fim elseif timer: ", timer.value);
        }   
        else    
            timer.value += num;
    }

    else if(num == 30 && btnn){

        var a = parseInt(timer.value);

        if(timer.value == " ")
            a = 0;
        // console.log(a);

        //console.log(timer.value.length);
        if(timer.value.length < 9 && timer.value != "99:30"){ //VERIFICA SE E MENOR QUE 5 PARA NÃO ESTOURAR A QUANTIDADE DE ELEMENTOS 
            var time = parseInt(timer.value); // SERVE PARA MUKTIPLICAR PRA NÃO DAR ERRO
            
            //console.log(timer.value);
            //console.log(time);
            
            if(time < 100)
                time = time * 10;
            
            if(timer.value == " ")
                time = 0;
            else if(timer.value != " "){
                timer.value = convertM(timer.value, true);
                time = parseInt(timer.value);
            }

            //console.log(time);

            var number = parseInt(num);
            
            //console.log("time: "+time+" number: "+number+" time + number: "+(time+number)+" val: "+val);
            //console.log(num);
            
            //console.log("dois");
            timer.value = time+number;
            timer.value = convertS(timer.value);
            //console.log("time: "+time+" number: "+number+" time + number: "+(time+number)+" val "+val.value);
        }
    }
}

//ZERAR/PAUZAR TEMPORIZADOR
canc = 0;
function cancel(){
    var timer = document.getElementById("iTimer");
    canc = parseInt(canc) + 1;
    //console.log(canc);
    if(ver == 0)
        timer.value = " ";
}



//INICIAR/ADICIONAR +30s
ver = 0;
badd = 1;
function iniciar(){
    var timer = document.getElementById("iTimer");
    badd = 0;
    number_time("30");
    
    if(ver == 0)
        cronometre();

    canc = 0;
}


// CONVERTE SEGUNDOS
function convertS(tel){
    //console.log("\nFUNÇÃO CONVERT-S");
    var val = document.getElementById("iCont") 
    var num = tel/60;
    
    if(!isNaN(num)){
        if(parseInt(num) != parseFloat(num)){
            var sgs = (num - parseInt(num)) * 60;
            num = parseInt(num);
            val.value = num+":"+parseInt(sgs);
            //console.log("Fração Minutos: "+num+" Segundos: "+sgs+" val.value: "+ val.value);
        }
        else
            val.value = num+":00";
    }
    
    //console.log("num: ", num, "tel:", tel);
    return val.value;
}


// CONVERT MINUTOS
function convertM(tel, veri){
    //console.log("\nFUNÇÃO CONVERT-M");
    //console.log(parseInt(tel.replace(":","")));
    
    if(parseInt(tel.replace(":","")) <= 30){
        //console.log("tel com 30 "+tel)
        return parseInt(tel.replace(":", ""));
    }
    else{
        tel = tel.replace(":", ".")
        //console.log("tel replace", tel);
        if(parseInt(tel) != parseFloat(tel)){
            var sgs = (tel - parseInt(tel)) * 100;
            
            /* if(veri){
                sgs = 30;
                //console.log("sgs = 30: ", sgs);
            } */
            if(sgs > 60)
                sgs = 60;
            
            //console.log("sgs: ", sgs, "parseint tel: ", parseInt(tel));
            
            tel = parseInt(tel);
            tel = (tel * 60) + parseInt(sgs); 
            //console.log("tel em fração: "+tel);
            return parseInt(tel);
        }
        else{
            //console.log("tel normal: "+tel);
            return parseInt(tel * 60);
        }
    }
}

// CRONOMETRO
function cronometre(){
    var timer = document.getElementById("iTimer");
    btnn = 1;

    if(timer.value.length == 2){
        if(timer.value > 60)
            timer.value = convertS(timer.value);
        else
            timer.value = "00:"+timer.value;
    }
    else if(timer.value.length == 1){
        timer.value = "00:0"+timer.value;
    }

    //console.log("timer.value", timer.value);
    
    timer.value = consert(timer.value);

    var contador = 1000;
    
    //console.log("contador: ", contador);
    ver = 1;

    sound(3, true);
    const tempo = setInterval(() =>{
        if(!canc){
            //console.log("canc:", canc);
            timer.value = increment(timer.value);
            sound(3, false);
        }

        if(canc > 1)
            timer.value = "00:00";
        //contador = parseInt(contador) - 1;
        //console.log(timer.value);
        if(timer.value == "00:00"){
            sound(4, true);
            badd = 1;
            ver = 0;
            clearInterval(tempo);
        }
    }, contador);

    /* 
 document.getElementById("reset").innerHTML = 3;
        const timer = setInterval(() =>{
            document.getElementById("reset").innerHTML--;
            if(document.getElementById("reset").innerHTML < 1){
                clearInterval(timer);
                reseta();
            }
        }, 1000);
        
        setTimeout(function(){ 
            reseta(); 
        }, 3000)
*/


    
}

// CONSERTA O TEMPORIZAADOR AO CLICAR EM INICIAR 
function consert(val){
    //console.log("FUNC CONCERT");
    var seg = (val.replace(":", ".") - parseInt(val)) * 100;
    var min = parseInt(val.replace(":", "."));

    //console.log("min: ", min, "seg: ", seg);
    if(seg > 60){
        //console.log("min: ", min, "seg: ", seg);
        min = parseInt(min) + 1;
        val = min+":00";
        //console.log("min: ", min, "seg: ", seg);
    }

    if(min > 60){
        //console.log("min: ", min," seg: ", seg);
        val = "59:00"
        //console.log("min: ", min," seg: ", seg);
    }

    return val;
}


function increment(val){
    //15:58
    //console.log("\nINCREMENTAL");
    var min = parseInt(val.replace(":", "."));
    var seg = (val.replace(":", ".") - parseInt(val)) * 100;
    var str;
    var veri = (seg - parseInt(seg)).toFixed(2);
    //console.log(min, seg);
    //console.log("veri: "+veri);
    

    if(veri == 0.00){
        //console.log("veri-2: "+veri);
        //console.log("test seg: ", parseInt(seg));
        if(seg != 0){
            seg = parseInt(seg) - 1;
            //console.log("seg depois if", seg);
        }
        else{
            if(min != 0)
                min--;
            seg = 59;
            //console.log("seg = 0 e fica 59");
        }
    }

    seg = parseInt(seg);

    if(parseInt(seg) < 10){
        seg = "0"+seg;
    }
    if(min == 0)
        min = "00";

    str = min+":"+seg;
    //console.log(min, seg, str);
    return str;
}

sounds = ["abrir.mp3", "fechar.mp3", "teclado.mp3", "esquentar.mp3", "final.mp3"];
function sound(val, ver){
    var audio = new Audio();

    console.log("audio: ", sounds[val]);
    audio.src = sounds[val];

    if(ver)
        audio.play();
    else{    
        audio.stop();
        console.log("pausa");
    }
};