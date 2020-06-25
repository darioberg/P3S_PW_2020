using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SensorSimulationForm.Models
{
    public class Liquid
    {
        [JsonProperty("livelloLiquido")]
        public int? Level { get; set; }
        public int? MaxLevel { get; }
        public int? MinLevel { get; }
        [JsonProperty("idSilos")]
        public int? IdSilos { get; }


        public Liquid()
        {
            MaxLevel = 160000;
            MinLevel = 0;
            IdSilos = 1;
        }


    }
}
