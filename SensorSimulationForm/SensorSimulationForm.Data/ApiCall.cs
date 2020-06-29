using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using SensorSimulationForm.Models;
using System.Linq;

namespace SensorSimulationForm.Data
{
    public class ApiCall
    {
        MalfunctionModel malfunctionModel = new MalfunctionModel();

        public GetSilosJsonResponse GetLiquidLevel()
        {
            // RECUPERO LIVELLO LIQUIDO
            using (WebClient wc = new WebClient())
            {
                var liquidLevel = wc.DownloadString("http://ec2-3-248-92-190.eu-west-1.compute.amazonaws.com:3000/getSilosById/1");

                GetSilosJsonResponse list = JsonConvert.DeserializeObject<GetSilosJsonResponse>(liquidLevel);


                return list;
            }  
        }


        public void PostSensorData(int? level, Sensor s1, Sensor s2, Sensor s3, Sensor s4, Sensor s5, Sensor s6, Sensor s7, Sensor s8)
        {
            LevelOperations PrimaryClass = new LevelOperations(level, s1, s2, s3, s4, s5, s6, s7, s8);

            var link = "http://ec2-3-248-92-190.eu-west-1.compute.amazonaws.com:3000/updateSilos";
            string stringToPost = PrimaryClass.Insert();
            
            // POSTO JSON SENSORI + LIQUIDO
            using (WebClient wc = new WebClient())
            {
                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.UploadString(link, WebRequestMethods.Http.Put, stringToPost);
            }
        }


        public void PostMalfunction(int sensorId, int? silosId, string malfunction)
        {
            var link = "http://ec2-3-248-92-190.eu-west-1.compute.amazonaws.com:3000/insertMalfunction";

            // POSTO MALFUNZIONAMENTI SENSORI
            using (WebClient wc = new WebClient())
            {
                malfunctionModel.IdSensore = sensorId;
                malfunctionModel.IdSilos = silosId;
                malfunctionModel.MalfunctionText = malfunction;

                var json = JsonConvert.SerializeObject(malfunctionModel);

                wc.Headers[HttpRequestHeader.ContentType] = "application/json";
                wc.UploadString(link, WebRequestMethods.Http.Post, json);
            }
        }

    }
}
