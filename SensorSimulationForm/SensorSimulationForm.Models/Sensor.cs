using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SensorSimulationForm.Models
{
    public class Sensor
    {
        //private string _numberID;
        //private int _activationLevel;
        //private bool _status;



        [JsonProperty("id")]
        public int NumberID { get; }

        public int ActivationLevel { get; }

        [JsonProperty("bool")]
        public bool Status { get; set; }


        public Sensor()
        {

        }

        public Sensor(int numberID, int activationLevel, bool status)
        {
            NumberID = numberID;
            ActivationLevel = activationLevel;
            Status = status;
        }
    }
}
