using SensorSimulationForm.Data;
using System;

namespace SensorSimulationForm.Services
{
    public class LevelOperationsService : ILevelOperationsService
    {

        private readonly ILevelOperations _levelOperations;

        public LevelOperationsService(ILevelOperations levelOperations)
        {
            _levelOperations = levelOperations;
        }


        //private readonly ILevelOperationsService _level;

        //public LevelOperationsService(ILevelOperationsService level)
        //{
        //    level = _level;

        //}


        public void Fill()
        {
            _levelOperations.Fill();
        }

        public void Empty()
        {
            throw new NotImplementedException();
        }

        public void Malfunction()
        {
            throw new NotImplementedException();
        }
    }
}
