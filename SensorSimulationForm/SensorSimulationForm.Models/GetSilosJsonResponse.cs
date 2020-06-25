using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace SensorSimulationForm.Models
{
    public class GetSilosJsonResponse
    {
        [JsonProperty("ID_Silos")]
        public int IdSilos { get; set; }

        [JsonProperty("LivelloLiquido")]
        public int LiquidLevel { get; set; }
    }
}
