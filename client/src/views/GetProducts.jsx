import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
export default function GetProducts({current,setCurrent}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCurrent(current);
    fetch(`https://api.trendyol.com/sapigw/suppliers/${current.supplierId}/products`,
      {
        headers:
          {
            "Authorization":`${current.apiUsername}${current.apiKey}`,
            "User-Agent":`${current.supplierId} - Sourpy`
          },
        mode:"no-cors"  
      }
    )
    .then(response => {
      setProducts(response);
      console.log(products);
    })   
    .catch((error) => {
      console.log('error ' + error.response.status);   
    });
  },[current])

  return (
    <li class="table-row">
    <div class="col col-2" data-label="Api Name">
      Isıtıcı
    </div>
    <div class="col col-3" data-label="Api Key">
      100TL
    </div>
    <div class="col col-4" data-label="Functions">
    </div>
  </li>
  )
}