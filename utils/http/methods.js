/**
 * Created by zuoxiaofei on 2018.7.16.
 */
import commonData from "./common";

export function Methods(axioxInstance) {

  return {
    post(url,data){
      data=Object.assign({},commonData,data);
      return axioxInstance.post(url,data)
    },
    get(url,params){
      return axioxInstance.get(url,params)
    }
  }
}