using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SensorSimulationForm.Data;
using SensorSimulationForm.Models;

namespace SensorSimulationForm
{
    public partial class Form1 : Form
    {
        Liquid liquid = new Liquid();
        //private readonly Liquid _liquid;
        ApiCall api = new ApiCall();

        //public Form1(Liquid liquid)
        //{
        //    _liquid = liquid;

        //}

        public Form1()
        {
            InitializeComponent();
        }

        LevelOperations leveloperations = new LevelOperations();

        private void FillBtn_Click(object sender, EventArgs e)
        {
            // CONTROLLO LA QUANTITÁ INSERITA
            if (int.Parse(textBox1.Text) > liquid.MaxLevel || int.Parse(textBox1.Text) < 1)
            {
                MessageBox.Show("La quantitá inserita deve essere compresa tra 1 e " + liquid.MaxLevel);
                textBox1.Text = "";
            }
            else
            {
                try
                {


                    leveloperations.Fill(int.Parse(textBox1.Text));
                }
                catch (WebException ex)
                {
                    MessageBox.Show("Il server non risponde, contattare P3S" + "  (" + ex.Message + ")");
                }
            }

            

        }

        private void button1_Click(object sender, EventArgs e)
        {       
            try
            {
                // CONTROLLO LA QUANTITÁ INSERITA
                if (api.GetLiquidLevel().LiquidLevel < int.Parse(textBox3.Text))
                {
                    MessageBox.Show("Il livello del silos é minore di quello inserito");
                }
                else
                {
                    leveloperations.Empty(int.Parse(textBox3.Text));

                }

            }
            catch (WebException ex)
            {
                MessageBox.Show("Il server non risponde, contattare P3S" + "  (" + ex.Message + ")");
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            // CONTROLLO LA QUANTITÁ INSERITA
            while (int.Parse(textBox2.Text) > liquid.MaxLevel || int.Parse(textBox2.Text) < 1)
            {
                MessageBox.Show("La quantitá inserita deve essere compresa tra 1 e " + liquid.MaxLevel);
            }

            try
            {
                leveloperations.Malfunction(int.Parse(textBox2.Text));

            }
            catch (WebException ex)
            {

                MessageBox.Show("Il server non risponde, contattare P3S" + "  (" + ex.Message + ")");
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            try
            {
                // CONTROLLO LA QUANTITÁ INSERITA
                while (api.GetLiquidLevel().LiquidLevel < int.Parse(textBox4.Text))
                {
                    MessageBox.Show("Il livello del silos é minore di quello inserito");
                }

                leveloperations.EmptyMalfunction(int.Parse(textBox4.Text));
            }
            catch (WebException ex)
            {
                MessageBox.Show("Il server non risponde, contattare P3S" + "  (" + ex.Message + ")");
            }
        }
    }
}
