using SensorSimulationForm.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SensorSimulationForm.Data
{
    public interface ILevelOperations
    {
        void Fill(int qty);
        void Empty(int qty);
        void Malfunction(int qty);
        string Insert();
        bool CheckNumber(int number, int[] vet);
    }
}
