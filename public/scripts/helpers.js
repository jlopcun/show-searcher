const I = id => document.getElementById(id),
elem = (tag) => document.createElement(tag)

const attr = (element,attribute,value,rtr = true)=>{
    element.setAttribute(attribute,value)
    if(rtr) return element
} 

const setText = (element,txt,rtr = true) =>{
    element.textContent = txt
    if(rtr) return element
}

const image = (src,className,alt)=> attr(addClass(attr(elem('img'),'src',src),className),'alt',alt)
const elWithText = (tag,txt,className) => addClass(setText(elem(tag),txt),className)
const containerElement = (tag,className,id,children) =>{

    return appendAll(attr(addClass(elem(tag),className),'id',id),children)
    
}

const link = (href,className,target = '')=> setText(attr(addClass(attr(elem('a'),'href',href),className),'target',target),'see more...')


const append = (element,node,rtr = true)=>{
    element.append(node)
    if(rtr) return element
}
const appendAll = (element,nodeList,rtr = true)=>{
    element.append(...nodeList)
    if(rtr) return element
}
const addClass = (element,className,rtr = true) =>{
    element.classList.add(className)
    if(rtr) return element
}


const show = el => el.classList.remove('hidden'),
hide = el => el.classList.add('hidden')

const removeAllStrings = (string,content) =>{
    return content.length>=1
    ?removeAllStrings(string.replaceAll(`${content[0]}`,''),content.slice(1,content.length))
    :string
    

}

const on = (eventType,fn,element) =>{
   element.addEventListener(eventType,fn)
}

const getInputValue = input => input.value


const clearElement = (element,rtr = true)=>{
    setText(element,"",false)
    if(rtr) return element
}

const fetchResource = async (link,headers,responseType) =>{
    try{
        const fetching = await fetch(link,headers),
        response = responseType==='json'
        ?await fetching.json()
        :responseType==='text'
        ?response.text()
        :response.blob()

        if(!fetching.ok) throw{
            code : fetching.status,
            text : fetching.statusText
        }
        return response
    }catch(err){
        console.warn(`${err.code} : ${err.text}`)
    }
}