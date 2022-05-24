import React, { useEffect } from "react";
export const listingInput = (t) => {
    console.log(t)
  switch (t) {
      case 'text':
          return function (d) {
              return (
                  <div>
                      <input {...d} />
                  </div>
              )
          }
          case 'checkbox':
            return function (d) {
              
       
                return (
                    <div >
                        <input {...d} />{d.text}
                    </div>
                )
            }   


      default:
          break;
  }
}