async function app(){
    
    on('submit',async (e)=>{
        e.preventDefault()
        show(I('loader'))
        clearElement(I('mainContent'),false)
        appendAll(I('mainContent'),  await getShows(getInputValue(I('searchField'))))
        hide(I('loader'))
    },I('searchForm'))
    
}

const getShows = async (showName) =>{
    const showData = await fetchResource(`https://api.tvmaze.com/search/shows/?q=${showName}`,{},'json')
    const shows = showData.map(show=>{
     return containerElement('div','show','',[
         image(show.show.image?show.show.image.original:"../public/assets/no_image.jpg",'show__image','show image'),
         elWithText('h2',show.show.name ,'show__name'),
         elWithText('p',show.show.summary?show.show.summary.replaceAll(/<(\/)?(\\)?(\w)+( ?\/)?>/gi,''):"no summary avaliable" ,'show__summary'),
         link(show.show.url,'show__url','_blank')
     ])
    })
    return await shows
}

app()