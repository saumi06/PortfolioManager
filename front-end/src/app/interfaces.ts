/** 
 * This file consists of interface that are used in service and component
 */


export interface ResponseResult{
  code: number,
  message: string
  response: []
}


export interface ResponseError{
  code: number,
  message: string
}


export interface MarketChangeFormat{
  raw: number, 
  fmt: string
}