using System;
using System.Collections.Generic;
using System.Text;

namespace SensorSimulationForm.Services
{
    public interface ILevelOperationsService
    {
        void Fill();
        void Empty();
        void Malfunction();
    }
}
