

document.addEventListener("readystatechange",(event)=>{
    if(event.target.readyState == "complete"){
        initApp();
    }
})

function validateName(Name){
    for(let point = 0; point < Name.length;++point){
        if(!(Name[point] >= 'a' && Name[point] <= 'z')){
            if(Name[point] == ' '){continue;}
            return true;
        }
    }
    return false;
}


function Valid(name1,name2){
    let condition = true;
    let msg = "";
    name1 = name1.trim().toLowerCase();
    name2 = name2.trim().toLowerCase();

    if(name1.length == 0 && name2.length == 0){
        msg = "Please Enter the Names";
        condition = false;
    }else if(name1.length == 0){
        msg = "Please Enter First Name";
        condition = false;
    }else if(name2.length == 0){
        msg = "Please Enter Second Name";
        condition = false;
    }

    if((validateName(name1) ||validateName(name2)) && name1.length != 0 && name2.length != 0){
        msg = "please enter Correct Name";
        condition = false;
    }

    if(msg){
        showResult("Error : (",msg);
    }

    return condition;
}


const findUnique = function(firstName, secondName){
    let count = 0;
    let cleanAlpha1 = removeSpace(firstName);
    let cleanAlpha2 = removeSpace(secondName);

    if(cleanAlpha1 === cleanAlpha2){return -1;}

    let name1 = cleanAlpha1.split("");
    let name2 = cleanAlpha2.split("");

    for(let point = 0; point < name1.length; ++point){
        if(name1[point] != '#'){
            for(let point1 = 0; point1 < name2.length; ++point1){
                if(name1[point] == name2[point1]){
                    name1[point] = '#';
                    name2[point1] = '#';
                    count += 2;
                    break;
                }
            }
        }
    }


    return (name1.length+name2.length)-count;
    
}

const matchRelation = function(letter){
    if(letter == 'f'){
        return "Friend";
    }else if(letter == 'l'){
        return "lover";
    }else if(letter == 'a'){
        return "Attraction";
    }else if(letter == 'm'){
        return "Marriage";
    }else if(letter == 'e'){
        return "Enemy";
    }

    return "Sister";
}

const predictRelation = function(unique){
    let relations = ['f','l','a','m','e','s']; //6
    let count = 1,point = 0;
    let end = 0;

    while(end < relations.length-1){
        if(point >= relations.length){
            point = 0;
        }

        if(count == unique && relations[point] != '*'){
            relations[point] = '*';
            count = 0;
            ++end;
        }else if(relations[point] == '*'){
            ++point;
            continue;
        }

        ++count;
        ++point;
    }

    for(let point = 0; point < relations.length; ++point){
        if(relations[point] >= 'a' && relations[point] <= 'z'){
            return matchRelation(relations[point]);
        }
    }

}

const removeSpace = function(Name){
    let removeSpace = "";

    for(let point = 0; point < Name.length; ++point){
        if(Name[point] != ' '){
            removeSpace += Name[point];
        }
    }

    Name = removeSpace;
    
    return Name;
}



const showResult = (headingContent,result) =>{
    document.querySelector(".result").style.left = "0";


    const displayResult = document.querySelector(".relation");
    const heading = document.querySelector(".result h2");

    heading.textContent = headingContent;
    displayResult.textContent = result;    
    
    setTimeout(()=>{
        document.querySelector(".close").style.width = "60px";
        document.querySelector(".close").style.height = "60px";
    },1500)
}

const initApp = () =>{


    const calculate = document.querySelector(".calculate");
    const reset = document.querySelector(".reset");

    reset.addEventListener("click",()=>{
        location.reload();
    })


    calculate.addEventListener("click",()=>{
        const firstName = document.querySelector(".firstName input");
        const secondName = document.querySelector(".secondName input");
        //write same name
        
        if(Valid(firstName.value,secondName.value)){
            let unique = findUnique(firstName.value,secondName.value);

            if(unique == -1){
                showResult("Ho no !", "Something Fishy");
            }else{
                const result = predictRelation(unique);
                showResult("Your Result",result);
            }

        }
        

    })

    const closeResult = document.querySelector(".close");

    closeResult.addEventListener("click",()=>{
        document.querySelector(".result").style.left = "-100%";
        setTimeout(()=>{
            document.querySelector(".close").style.width = "0px";
            document.querySelector(".close").style.height = "0px";
        },1500)
    })
}