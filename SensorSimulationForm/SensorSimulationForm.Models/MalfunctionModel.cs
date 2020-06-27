using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace SensorSimulationForm.Models
{
    public class MalfunctionModel
    {
        [JsonProperty("ID_Sensore")]
        public int IdSensore { get; set; }
        [JsonProperty("ID_Silos")]
        public int? IdSilos { get; set; }
        [JsonProperty("Descrizione")]
        public string MalfunctionText { get; set; }

        public MalfunctionModel()
        {

        }
    }
}
