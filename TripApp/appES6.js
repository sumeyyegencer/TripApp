class Trip
{
    constructor(name,district,image)
    {
        this.tripId= Math.floor(Math.random()*100);
        this.name=name,
        this.district=district,
        this.image=image
    }
}


class UI
{
    addTripToList(trip)
    {
        const list= document.getElementById("trip-list");


        var html= `

        <tr>

        <td> <img style="width: 250px;
        height: 100px;  object-fit:cover;" src="img/${trip.image}"> </td>
        <td>${trip.name} </td>
        <td>${trip.district} </td>
        <td> <button type="button" data-id="${trip.tripId}" class="btn btn-danger delete">Sil</button> </td>
        </tr>
        `;

        list.innerHTML+=html;
    
    }

    clearControl()
    {
        const name=document.getElementById("name").value="";
        const district=document.getElementById("district").value="";
        const image=document.getElementById("image").value="";
    }

    showAlert(message,className)
    {
        

        var alert=
        `
        <div class="alert alert-${className}">${message}</div>

        `

        const row= document.querySelector(".row");
        row.insertAdjacentHTML("beforebegin",alert);

        setTimeout(()=>{
            document.querySelector(".alert").remove();
        },3000);

    
        
    }

    deleteTrip(element)
    {
        if(element.classList.contains("delete"))
        {
            element.parentElement.parentElement.remove();

        }

    }
}


class Storage
{
    //LocalStorage'daki triplerin kontrolü sağlanıyor.
    static getTrips()
    {

        let trips;

        if(localStorage.getItem("trips")===null)
        {
            trips=[];
        }


        else{
            trips=JSON.parse(localStorage.getItem(trips));
        }

        return trips;


    }

    //LS de olan tripsler ekrana basılıyor.(Ekran yenilense dahi ekrana geliyor,tıpkı bir db gibi.)
    static displayTrips()
    {
        const trips=Storage.getTrips();

        trips.forEach(trip => {
            const ui= new UI();
            ui.addTripToList(trip);
                        });

    }


    //Yeni eklenen trip LS 'ye ekleniyor.
    static addTrip(trip)
    {
        const trips=Storage.getTrips();

        trips.push(trip);
        localStorage.setItem("trips", JSON.stringify(trips));

    }

    static deleteTrip(element)
    {

        if(element.classList.contains("delete"))
        {
            const id= element.getAttribute("data-id");

            const trips= Storage.getTrips();

            trips.forEach((trip,index)=>{
                if(trip.tripId==id){
                    trip.splice(index,1);
                }
            });

            localStorage.setItem("trips",JSON.stringify(trips));
            
        }

    }

}

document.addEventListener("DOMContentLoaded", Storage.displayTrips);

document.getElementById("new-trip").addEventListener("submit", function(e){

    const name= document.getElementById("name").value;
    const district=document.getElementById("district").value;
    const image= document.getElementById("image").value;


 const trip=new Trip(name,district,image);



 const ui=new UI();

 if(name==" " || district==" " || image== "")
    {
        ui.showAlert("Lütfen form bilgilerini tamamlayınız.", "warning");
    }


  else
   {
    
    ui.addTripToList(trip);
    //console.log(JSON.stringify(trip));

    //Save to LS
    Storage.addTrip(trip);

    ui.clearControl();

    ui.showAlert("Gezi bilgileri eklenmiştir.","success");


    }


 e.preventDefault();

})


document.getElementById("trip-list").addEventListener("click",function(e){

    const ui=new UI();

    ui.deleteTrip(e.target);


    //Delete from LS
    Storage.deleteTrip(e.target);

    ui.showAlert("Gezi listeden silinmiştir.","danger");



})


