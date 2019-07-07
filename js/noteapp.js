window.onload  = () =>{
    const cards= document.getElementsByClassName('notes')
    cards[0].setAttribute('class','notes load');

    if (storageAvailable('localStorage')) {
        document.querySelector('.add-note').addEventListener('click',()=>{
                const notesContent = localStorage.getItem('notes'),newNotes = {};
                let  notes = [];
                newNotes.createdOn = Date.now();
                newNotes.text = ' ';
                if (notesContent !== null && notesContent !=='') {
                    notes = JSON.parse(notesContent);
                } 
                notes.push(newNotes);
                localStorage.setItem('notes',JSON.stringify(notes));
                const   newCard = document.createElement('div');
                        newCard.setAttribute('class','note note-'+newNotes.createdOn);
                const cards = document.querySelector('.notes')
                              cards.insertBefore(newCard,cards.childNodes[0]);
                const   getCard = document.getElementsByClassName('note');
                        getCard[0].innerHTML = cardContent(newNotes);
                        document.getElementsByClassName('note-area')[0].contentEditable = true;
                ///now scroll back up
                scrollBackUp();
                
        });

    notes = JSON.parse(localStorage.getItem('notes'));
    if( notes !== null && notes !=='') {
        notes.reverse();
        let i = 0;
        notes.forEach(note => {
            const cards = document.createElement('div');
                cards.setAttribute('class','note note-'+note.createdOn);
                document.querySelector('.notes').appendChild(cards);
            const card = document.getElementsByClassName('note');
            card[i].innerHTML = cardContent(note);
            document.getElementsByClassName('note-area')[i].contentEditable = true;
            i++;
        });
    }

  }
    
}

///check if storage is available 

  storageAvailable = (type) => {
     let  storage;

     try {

         storage = window[type];
         const x = '__storage_test__';
         storage.setItem(x,x);
         storage.removeItem(x);

         return true;
         
     } catch (e) {

        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
     }
 }

  cardContent = (note) => {
     const dateTime = new Date(note.createdOn);
     let content = '<div class="note-header"><div class="header-content">'+ dateTime.toDateString() +'</div>';
         content         +='<div class="header-content"><i class="fa fa-edit icon-'+note.createdOn+'"></i><i class="fa fa-trash" onclick="deleteNote('+note.createdOn+')"></i>';
         content          +='</div></div> <div class="note-body"> <div class="note-area"  onblur="updateCard(this)" id="'+note.createdOn+'">'+note.text+'</div></div>';

           return content;
 }


 updateCard = (div) => {
     const text = div.innerHTML;
    //  let id='';
     const getNotes = JSON.parse(localStorage.getItem('notes'));
     const updatedNotes = [];

     getNotes.forEach(note =>{
         if (note.createdOn == div.id) {
             note.text = text;
            //  id=note.createdOn;
             updatedNotes.push(note);
         } else {
            updatedNotes.push(note);
         }
         
     });
     localStorage.setItem('notes',JSON.stringify(updatedNotes));
     const icon =document.querySelector('.icon-'+div.id);
     setTimeout(()=>{
        icon.setAttribute('class','fa fa-edit icon-'+div.id);
        icon.style.color = '#000';
     },3000);
        icon.setAttribute('class','fa fa-check icon-'+div.id);
        icon.style.color = '#00C851';
     
    
 }



  deleteNote = (timestamp) => {
    const getNotes = JSON.parse(localStorage.getItem('notes'));
    notesArr = [];
    getNotes.forEach(note =>{
        if (note.createdOn !== timestamp) {
            notesArr.push(note);
        } 
    });

    localStorage.setItem('notes',JSON.stringify(notesArr));

    let node = document.getElementsByClassName('note-'+timestamp);
    if (node[0].parentNode) {
        node[0].parentNode.removeChild(node[0]);
    }
    
 }

 scrollBackUp = ()=> {
    //  for  safari
     document.body.scrollTop = 0;
    /// other browsers
    document.documentElement.scrollTop = 0;
 }

