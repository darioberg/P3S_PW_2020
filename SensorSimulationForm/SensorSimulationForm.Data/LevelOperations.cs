using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SensorSimulationForm.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography;

namespace SensorSimulationForm.Data
{
    public class LevelOperations : ILevelOperations
    {

        ApiCall api = new ApiCall();

        private readonly Liquid _level;


        private Sensor sensor1 = new Sensor(1, 20000, false);
        private Sensor sensor2 = new Sensor(2, 40000, false);
        private Sensor sensor3 = new Sensor(3, 60000, false);
        private Sensor sensor4 = new Sensor(4, 80000, false);
        private Sensor sensor5 = new Sensor(5, 100000, false);
        private Sensor sensor6 = new Sensor(6, 120000, false);
        private Sensor sensor7 = new Sensor(7, 140000, false);
        private Sensor sensor8 = new Sensor(8, 160000, false);


        public LevelOperations()
        {
            _level = new Liquid();



        }
        public LevelOperations(int? level, Sensor s1, Sensor s2, Sensor s3, Sensor s4, Sensor s5, Sensor s6, Sensor s7, Sensor s8)
        {
            _level = new Liquid();
            _level.Level = level;

            sensor1 = s1;
            sensor2 = s2;
            sensor3 = s3;
            sensor4 = s4;
            sensor5 = s5;
            sensor6 = s6;
            sensor7 = s7;
            sensor8 = s8;


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




        public void Fill(int qty)
        {
            int aux;
            int litersToAdd = 100;
            var getLiquidLevel = api.GetLiquidLevel();

            _level.Level = getLiquidLevel.LiquidLevel;

            for (int i = 0; i < qty; i += litersToAdd)
            {

                if ((_level.Level + litersToAdd) > (getLiquidLevel.LiquidLevel + qty))
                {
                    //if (litersToAdd > qty)
                    //{
                    //    aux = litersToAdd - qty;
                    //}
                    //else
                    //{
                    //    aux = qty - litersToAdd;
                    //}
                    _level.Level += litersToAdd - (_level.Level + litersToAdd - qty);
                }
                else
                {
                    _level.Level += litersToAdd;
                }



                System.Threading.Thread.Sleep(1);


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




                api.PostSensorData(_level.Level, sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7, sensor8);
            }



        }
        public void Empty(int qty)
        {

            int aux;
            int litersToRemove = 100;
            var getLiquidLevel = api.GetLiquidLevel();

            _level.Level = getLiquidLevel.LiquidLevel;



            for (int i = 0; i < qty; i += litersToRemove)
            {

                if ((_level.Level - litersToRemove) < (getLiquidLevel.LiquidLevel - qty))
                {                  
                    _level.Level -= qty - (getLiquidLevel.LiquidLevel - _level.Level);
                }
                else
                {
                    _level.Level -= litersToRemove;
                }

                
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

                api.PostSensorData(_level.Level, sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7, sensor8);
            }
        }

        public void Malfunction(int qty)
        {
            int aux;
            int litersToAdd = 100;
            var getLiquidLevel = api.GetLiquidLevel();

            _level.Level = getLiquidLevel.LiquidLevel;



            Random rand = new Random();
            var randomNumberCicle = rand.Next(1, 9);
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

            for (int i = 0; i < qty; i += litersToAdd)
            {

                if ((_level.Level + litersToAdd) > (getLiquidLevel.LiquidLevel + qty))
                {
                    //if (litersToAdd > qty)
                    //{
                    //    aux = litersToAdd - qty;
                    //}
                    //else
                    //{
                    //    aux = qty - litersToAdd;
                    //}
                    _level.Level += litersToAdd - (_level.Level + litersToAdd - qty);
                }
                else
                {
                    _level.Level += litersToAdd;
                }


                System.Threading.Thread.Sleep(10);
                switch (_level.Level)
                {
                    case 20000:
                        if (CheckNumber(1, malfunctionSensors))
                        {
                            sensor1.Status = true;
                        }
                        else { sensor1.Status = false; }
                        break;
                    case 40000:
                        if (CheckNumber(2, malfunctionSensors))
                        {
                            sensor2.Status = true;
                        }
                        else { sensor2.Status = false; }
                        break;
                    case 60000:
                        if (CheckNumber(3, malfunctionSensors))
                        {
                            sensor3.Status = true;
                        }
                        else { sensor3.Status = false; }
                        break;
                    case 80000:
                        if (CheckNumber(4, malfunctionSensors))
                        {
                            sensor4.Status = true;
                        }
                        else { sensor4.Status = false; }
                        break;
                    case 100000:
                        if (CheckNumber(5, malfunctionSensors))
                        {
                            sensor5.Status = true;
                        }
                        else { sensor5.Status = false; }
                        break;
                    case 120000:
                        if (CheckNumber(6, malfunctionSensors))
                        {
                            sensor6.Status = true;
                        }
                        else { sensor6.Status = false; }
                        break;
                    case 140000:
                        if (CheckNumber(7, malfunctionSensors))
                        {
                            sensor7.Status = true;
                        }
                        else { sensor7.Status = false; }
                        break;
                    case 160000:
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

                //api.PostSensorData(_level.Level, sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7, sensor8);
            }


            for (int i = 0; i < errorMessage.Length; i++)
            {
                Debug.WriteLine(errorMessage[i]);
            }


        }

        public void EmptyMalfunction(int qty)
        {
            int aux;
            int litersToRemove = 100;
            var getLiquidLevel = api.GetLiquidLevel();

            _level.Level = getLiquidLevel.LiquidLevel;


            Random rand = new Random();
            var randomNumberCicle = rand.Next(1, 9);
            int randomNumber;
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

            for (int i = 0; i < qty; i+= litersToRemove)
            {

                if ((_level.Level - litersToRemove) < (getLiquidLevel.LiquidLevel - qty))
                {
                    _level.Level -= qty - (getLiquidLevel.LiquidLevel - _level.Level);
                }
                else
                {
                    _level.Level -= litersToRemove;
                }

                
                System.Threading.Thread.Sleep(10);
                switch (_level.Level)
                {
                    case 20000:
                        if (CheckNumber(1, malfunctionSensors))
                        {
                            sensor1.Status = true;
                        }
                        else { sensor1.Status = false; }
                        break;
                    case 40000:
                        if (CheckNumber(2, malfunctionSensors))
                        {
                            sensor2.Status = true;
                        }
                        else { sensor2.Status = false; }
                        break;
                    case 60000:
                        if (CheckNumber(3, malfunctionSensors))
                        {
                            sensor3.Status = true;
                        }
                        else { sensor3.Status = false; }
                        break;
                    case 80000:
                        if (CheckNumber(4, malfunctionSensors))
                        {
                            sensor4.Status = true;
                        }
                        else { sensor4.Status = false; }
                        break;
                    case 100000:
                        if (CheckNumber(5, malfunctionSensors))
                        {
                            sensor5.Status = true;
                        }
                        else { sensor5.Status = false; }
                        break;
                    case 120000:
                        if (CheckNumber(6, malfunctionSensors))
                        {
                            sensor6.Status = true;
                        }
                        else { sensor6.Status = false; }
                        break;
                    case 140000:
                        if (CheckNumber(7, malfunctionSensors))
                        {
                            sensor7.Status = true;
                        }
                        else { sensor7.Status = false; }
                        break;
                    case 160000:
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

                    if (sensor1.Status == false && boolArray[0] == true)
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


                    if (sensor2.Status == false && boolArray[1] == true)
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


                    if (sensor3.Status == false && boolArray[2] == true)
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


                    if (sensor4.Status == false && boolArray[3] == true)
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


                    if (sensor5.Status == false && boolArray[4] == true)
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


                    if (sensor6.Status == false && boolArray[5] == true)
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

                    if (sensor7.Status == false && boolArray[6] == true)
                    {
                        errorMessage[6] = "Malfunzionamento sensore " + sensor7.NumberID;
                    }
                }

                if (_level.Level + 1 >= sensor8.ActivationLevel)
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


                //api.PostSensorData(_level.Level, sensor1, sensor2, sensor3, sensor4, sensor5, sensor6, sensor7, sensor8);
            }


            for (int i = 0; i < errorMessage.Length; i++)
            {
                Debug.WriteLine(errorMessage[i]);
            }



        }


        public void TurbineFillMalfunction(int qty)
        {

        }


        public void TurbineEmptyMalfunction(int qty)
        {

        }

        public string Insert()
        {

            List<Sensor> sensorList = new List<Sensor>()
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

            return sensorjson;
        }


    }
}