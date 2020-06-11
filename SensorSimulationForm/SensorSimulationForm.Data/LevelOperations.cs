using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SensorSimulationForm.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;

namespace SensorSimulationForm.Data
{
    public class LevelOperations : ILevelOperations
    {

        private readonly Liquid _level;


        private readonly Sensor sensor1 = new Sensor(1, 200, false);
        private readonly Sensor sensor2 = new Sensor(2, 400, false);
        private readonly Sensor sensor3 = new Sensor(3, 600, false);
        private readonly Sensor sensor4 = new Sensor(4, 800, false);
        private readonly Sensor sensor5 = new Sensor(5, 1000, false);
        private readonly Sensor sensor6 = new Sensor(6, 1200, false);
        private readonly Sensor sensor7 = new Sensor(7, 1400, false);
        private readonly Sensor sensor8 = new Sensor(8, 1600, false);


        public LevelOperations()
        {
            _level = new Liquid();

        }


        public bool CheckNumber(int number, int[] vet)
        {
            for (int i = 0; i < vet.Length; i++)
            {
                if (vet[i] == number)
                {
                    return false;
                }
            }
            return true;
        }

     
        //_level.Level = _level.MinLevel;

        public void Fill(int qty)
        {

            for (int i = 0; i < qty; i++)
            {
                _level.Level += 1;
                System.Threading.Thread.Sleep(10);


                if (_level.Level >= sensor1.ActivationLevel)
                {
                    sensor1.Status = true;
                }
                if (_level.Level >= sensor2.ActivationLevel)
                {
                    sensor2.Status = true;
                }
                if (_level.Level >= sensor3.ActivationLevel)
                {
                    sensor3.Status = true;
                }
                if (_level.Level >= sensor4.ActivationLevel)
                {
                    sensor4.Status = true;
                }
                if (_level.Level >= sensor5.ActivationLevel)
                {
                    sensor5.Status = true;
                }
                if (_level.Level >= sensor6.ActivationLevel)
                {
                    sensor6.Status = true;
                }
                if (_level.Level >= sensor7.ActivationLevel)
                {
                    sensor7.Status = true;
                }
                if (_level.Level >= sensor8.ActivationLevel)
                {
                    sensor8.Status = true;
                }



                if (_level.Level > _level.MaxLevel)
                {
                    Debug.WriteLine("Limite Massimo Raggiunto");
                    break;
                }

                Debug.WriteLine(_level.Level);

                Insert();
            }
        }
        public void Empty(int qty)
        {

            for (int i = 0; i < qty; i++)
            {
                _level.Level -= 1;
                System.Threading.Thread.Sleep(10);

                if (_level.Level < sensor1.ActivationLevel)
                {
                    sensor1.Status = false;
                }
                if (_level.Level < sensor2.ActivationLevel)
                {
                    sensor2.Status = false;
                }
                if (_level.Level < sensor3.ActivationLevel)
                {
                    sensor3.Status = false;
                }
                if (_level.Level < sensor4.ActivationLevel)
                {
                    sensor4.Status = false;
                }
                if (_level.Level < sensor5.ActivationLevel)
                {
                    sensor5.Status = false;
                }
                if (_level.Level < sensor6.ActivationLevel)
                {
                    sensor6.Status = false;
                }
                if (_level.Level < sensor7.ActivationLevel)
                {
                    sensor7.Status = false;
                }
                if (_level.Level < sensor8.ActivationLevel)
                {
                    sensor8.Status = false;
                }

                Debug.WriteLine(_level.Level);

                if (_level.Level <= _level.MinLevel)
                {
                    Debug.WriteLine("Il livello è 0");
                    _level.Level = _level.MinLevel;
                    break;
                }
            }
        }

        public void Malfunction(int qty)
        {
            Random rand = new Random();
            var randomNumberCicle = rand.Next(1, 9);
            var lastNumber = 0;
            bool check = true;
            int randomNumber = 0;
            string[] errorMessage = new string[8];
            int[] malfunctionSensors = new int[8];
            bool[] boolArray = new bool[8];
            boolArray[0] = false;
            boolArray[1] = false;
            boolArray[2] = false;
            boolArray[3] = false;
            boolArray[4] = false;
            boolArray[5] = false;
            boolArray[6] = false;
            boolArray[7] = false;

            Debug.WriteLine("iterazioni {0}", randomNumberCicle);

            for (int i = 0; i < randomNumberCicle; i++)
            {
                do
                {
                    randomNumber = rand.Next(1, 9);
                } while (!CheckNumber(randomNumber, malfunctionSensors));

                malfunctionSensors[i] = randomNumber;

                switch (randomNumber)
                {
                    case 1:
                        sensor1.Status = false;
                        boolArray[0] = true;
                        break;
                    case 2:
                        sensor2.Status = false;
                        boolArray[1] = true;
                        break;
                    case 3:
                        sensor3.Status = false;
                        boolArray[2] = true;
                        break;
                    case 4:
                        sensor4.Status = false;
                        boolArray[3] = true;
                        break;
                    case 5:
                        sensor5.Status = false;
                        boolArray[4] = true;
                        break;
                    case 6:
                        sensor6.Status = false;
                        boolArray[5] = true;
                        break;
                    case 7:
                        sensor7.Status = false;
                        boolArray[6] = true;
                        break;
                    case 8:
                        sensor8.Status = false;
                        boolArray[7] = true;
                        break;
                }

                Debug.WriteLine("sensore numero {0}", randomNumber);
            }

            for (int i = 0; i < qty; i++)
            {

                _level.Level += 1;
                System.Threading.Thread.Sleep(10);
                switch (_level.Level)
                {
                    case 200:
                        if (CheckNumber(1, malfunctionSensors))
                        {
                            sensor1.Status = true;
                        }
                        else { sensor1.Status = false; }
                        break;
                    case 400:
                        if (CheckNumber(2, malfunctionSensors))
                        {
                            sensor2.Status = true;
                        }
                        else { sensor2.Status = false; }
                        break;
                    case 600:
                        if (CheckNumber(3, malfunctionSensors))
                        {
                            sensor3.Status = true;
                        }
                        else { sensor3.Status = false; }
                        break;
                    case 800:
                        if (CheckNumber(4, malfunctionSensors))
                        {
                            sensor4.Status = true;
                        }
                        else { sensor4.Status = false; }
                        break;
                    case 1000:
                        if (CheckNumber(5, malfunctionSensors))
                        {
                            sensor5.Status = true;
                        }
                        else { sensor5.Status = false; }
                        break;
                    case 1200:
                        if (CheckNumber(6, malfunctionSensors))
                        {
                            sensor6.Status = true;
                        }
                        else { sensor6.Status = false; }
                        break;
                    case 1400:
                        if (CheckNumber(7, malfunctionSensors))
                        {
                            sensor7.Status = true;
                        }
                        else { sensor7.Status = false; }
                        break;
                    case 1600:
                        if (CheckNumber(8, malfunctionSensors))
                        {
                            sensor8.Status = true;
                        }
                        else { sensor8.Status = false; }
                        break;
                }

                if (_level.Level >= sensor1.ActivationLevel)
                {

                    //if (malfunctionSensors[x] == 1)
                    //{
                    //    sensor1.Status = false;
                    //}
                    //else
                    //{
                    //    sensor1.Status = true;
                    //}

                    if (_level.Level >= sensor2.ActivationLevel && sensor1.Status == false && boolArray[0] == true)
                    {
                        errorMessage[0] = "Malfunzionamento sensore " + sensor1.NumberID;
                    }
                }

                if (_level.Level >= sensor2.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 2)
                    //{
                    //    sensor2.Status = false;
                    //}
                    //else
                    //{
                    //    sensor2.Status = true;
                    //}


                    if (_level.Level >= sensor3.ActivationLevel && sensor2.Status == false && boolArray[1] == true)
                    {
                        errorMessage[1] = "Malfunzionamento sensore " + sensor2.NumberID;
                    }
                }

                if (_level.Level >= sensor3.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 3)
                    //{
                    //    sensor3.Status = false;
                    //}
                    //else
                    //{
                    //    sensor3.Status = true;
                    //}


                    if (_level.Level >= sensor4.ActivationLevel && sensor3.Status == false && boolArray[2] == true)
                    {
                        errorMessage[2] = "Malfunzionamento sensore " + sensor3.NumberID;
                    }
                }

                if (_level.Level >= sensor4.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 4)
                    //{
                    //    sensor4.Status = false;
                    //}
                    //else
                    //{
                    //    sensor4.Status = true;
                    //}


                    if (_level.Level >= sensor5.ActivationLevel && sensor4.Status == false && boolArray[3] == true)
                    {
                        errorMessage[3] = "Malfunzionamento sensore " + sensor4.NumberID;
                    }
                }

                if (_level.Level >= sensor5.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 5)
                    //{
                    //    sensor5.Status = false;
                    //}
                    //else
                    //{
                    //    sensor5.Status = true;
                    //}


                    if (_level.Level >= sensor6.ActivationLevel && sensor5.Status == false && boolArray[4] == true)
                    {
                        errorMessage[4] = "Malfunzionamento sensore " + sensor5.NumberID;
                    }
                }

                if (_level.Level >= sensor6.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 6)
                    //{
                    //    sensor6.Status = false;
                    //}
                    //else
                    //{
                    //    sensor6.Status = true;
                    //}


                    if (_level.Level >= sensor7.ActivationLevel && sensor6.Status == false && boolArray[5] == true)
                    {
                        errorMessage[5] = "Malfunzionamento sensore " + sensor6.NumberID;
                    }
                }

                if (_level.Level >= sensor7.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 7)
                    //{
                    //    sensor7.Status = false;
                    //}
                    //else
                    //{
                    //    sensor7.Status = true;
                    //}

                    if (_level.Level >= sensor8.ActivationLevel && sensor7.Status == false && boolArray[6] == true)
                    {
                        errorMessage[6] = "Malfunzionamento sensore " + sensor7.NumberID;
                    }
                }

                if (_level.Level >= sensor8.ActivationLevel)
                {
                    //if (malfunctionSensors[x] == 8)
                    //{
                    //    sensor8.Status = false;
                    //}
                    //else
                    //{
                    //    sensor8.Status = true;
                    //}
                    if (boolArray[7] == true)
                    {
                        errorMessage[7] = "Malfunzionamento sensore " + sensor8.NumberID;
                    }

                }

                if (_level.Level > _level.MaxLevel)
                {
                    Debug.WriteLine("Limite Massimo Raggiunto");
                    break;
                }

                Debug.WriteLine(_level.Level);               
            }


            for (int i = 0; i < errorMessage.Length; i++)
            {
                Debug.WriteLine(errorMessage[i]);
            }

            Insert();
        }

        public void Insert()
        {
            //Sensor[] sensorArray = { sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7, sensor8 };

            List<Sensor> sensorList = new List<Sensor>
            {

                sensor1,
                sensor2,
                sensor3,
                sensor4,
                sensor5,
                sensor6,
                sensor7,
                sensor8
            };

            JsonClass json = new JsonClass()
            {
                IdSilos = _level.IdSilos,
                LivelloLiquido = _level.Level,
                Sensori = sensorList
            };

            string sensorjson = JsonConvert.SerializeObject(json);



            //using (StreamWriter file = new StreamWriter("C:\\Users\\Dario\\Documents\\json.json"))
            //{
            //    file.WriteLine(sensorjson);


            //}
        }


    }
}