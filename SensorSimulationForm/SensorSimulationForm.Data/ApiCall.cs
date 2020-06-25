using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using SensorSimulationForm.Models;

namespace SensorSimulationForm.Data
{
    public class ApiCall
    {
        

        public GetSilosJsonResponse GetLiquidLevel()
        {


            var client = new WebClient();

            var liquidLevel = client.DownloadString("http://silevel.ddnsking.com:3000/getSilosById/1");



            GetSilosJsonResponse list = JsonConvert.DeserializeObject<GetSilosJsonResponse>(liquidLevel);




            return list;
        }


        public void PostSensorData(int? level, Sensor s1, Sensor s2, Sensor s3, Sensor s4, Sensor s5, Sensor s6, Sensor s7, Sensor s8)
        {
            LevelOperations PrimaryClass = new LevelOperations(level, s1, s2, s3, s4, s5, s6, s7, s8);

            var link = "http://silevel.ddnsking.com:3000/updateSilos";
            string stringToPost = PrimaryClass.Insert();



            



            using (WebClient wc = new WebClient())
            {
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.UploadString(link, WebRequestMethods.Http.Put, stringToPost);
            }

        }


        public void PostMalfunction()
        {

        }

    }
}
