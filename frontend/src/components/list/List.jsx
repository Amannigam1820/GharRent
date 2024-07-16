import React from 'react'
import {listData} from "../../lib/dummydata"
import Card from "../card/Card"
import "./list.scss"

const List = ({data}) => {
  //console.log(data);

  // data.map((item)=>(
  //   console.log(item)
  // ))

 // console.log(data);

  const updatedData = data.map((item)=>{
    if(item.images.length > 0){
      const firstImage = item.images[0];
      return {
        ...item,
        images:firstImage
      }

    }else{
      const emptyImage = item.images.toString();
      return{
        ...item,
        images:emptyImage
      }
    }
  })

  //console.log(updatedData);
  
  return (
    <div className="list">
        {
          updatedData.map(item=>(
                <Card key={item.id} item={item}/>
            ))
        }
    </div>
  )
}

export default List