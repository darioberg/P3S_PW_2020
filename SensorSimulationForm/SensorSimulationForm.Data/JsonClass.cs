using Newtonsoft.Json;
using SensorSimulationForm.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SensorSimulationForm.Data
{
    public class JsonClass
    {
        [JsonProperty("idSilos")]
        public int? IdSilos { get; set; }
        [JsonProperty("livelloLiquido")]
        public int? LivelloLiquido { get; set; }
        [JsonProperty("sensori")]
        public List<Sensor> Sensori { get; set; }
    }
}
