import { DataItem } from "./DataItem";

 export const testData: DataItem[] = [
    {ID : 1, Title: "one", Description: "one", LevelOfImportance: 1, Date: "14-04-2024", Time: "10:30", Address: "Berceni 1" },
    {ID : 2, Title: "two", Description: "one", LevelOfImportance: 1, Date: "14-04-2024", Time: "10:30", Address: "Berceni 2" },
    {ID : 3, Title: "three", Description: "one", LevelOfImportance: 1, Date: "14-04-2024", Time: "10:30", Address: "Berceni 3" },
 ];

 const url = "https://appointmentswebapi-ekeyg5gbgkencjbq.westeurope-01.azurewebsites.net/api/appointment";


export const entry:any = {
   title: "Test",
   description: "Test",
   address: "Test",
   date: "",
   time: "10:10",
   done: false,
   deleted: false,
   levelOfImportance: 2
}

export const activeId = {
   id: 0
}


 export async function getAppointments(){
   const res = await fetch(url);

   if(!res.ok){
      console.log("Error");
      return [];
   }

   return await res.json();
 }

 export async function getAppointmentById(id: any) {
   const res = await fetch(`${url}/${id}`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json"
      }
   });

   if (!res.ok) {
      const err = await res.text();
      console.error("Error fetching appointment by id:", err);
      throw new Error(err);
   }

   const data = await res.json();
   console.log("Response is:", data);
   return data;
}


export async function addAppointment(app: any){
   const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(app),
      headers: {
         "content-type": "application/json"
      }
   });

   if(!res.ok){
      console.log("Error");
      return {msg: res};
   }

   return await res.json();

}

export async function updateAppointment(app: any) {

   try {

       const res = await fetch(`${url}/${activeId.id}`, {
           method: "PUT",
           body: JSON.stringify(app),
           headers: {
               "Content-Type": "application/json"
           }
       });

       if (!res.ok) {
           const errorText = await res.text();
           console.error("Error updating appointment:", errorText);
           return { msg: "Error updating appointment", status: res.status, error: errorText };
       }

       return await res.json();

   } catch (error) {
       console.error("Network error:", error);
       return { msg: "Network error occurred", error };
   }
}

export async function deleteAppointment(id: any) {
   const res = await fetch(`${url}/${id}`, { 
      method: "DELETE",
      headers: {
         "Content-Type": "application/json"
      }
   });

   if (!res.ok) {
      console.log("Error deleting appointment");
      return { msg: res };
   }

   // Check if response has a body before parsing
   try {
       return await res.json(); // Parse if JSON body exists
   } catch (error) {
       return {}; // Return an empty object if there is no response body
   }
}



export function openModal(modal: any){
   const mod = document.querySelector("."+modal);
   if(mod){
      mod.classList.remove("hidden");
   }
}

export function closeModel(modal: any){
   const mod = document.querySelector("."+modal);
   if(mod){
      mod.classList.add('hidden');
   }
}