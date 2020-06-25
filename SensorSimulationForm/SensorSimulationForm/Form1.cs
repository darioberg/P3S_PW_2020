using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SensorSimulationForm.Data;
using SensorSimulationForm.Models;

namespace SensorSimulationForm
{
    public partial class Form1 : Form
    {
       
        private readonly Liquid _liquid;

        public Form1(Liquid liquid)
        {
            _liquid = liquid;
        }

        public Form1()
        {
            InitializeComponent();
        }

        LevelOperations leveloperations = new LevelOperations();

        private void FillBtn_Click(object sender, EventArgs e)
        {
            leveloperations.Fill(int.Parse(textBox1.Text));   
        }

        private void button1_Click(object sender, EventArgs e)
        {
            leveloperations.Empty(int.Parse(textBox3.Text));
        }

        private void button2_Click(object sender, EventArgs e)
        {
            leveloperations.Malfunction(int.Parse(textBox2.Text));
        }

        private void button3_Click(object sender, EventArgs e)
        {
            leveloperations.EmptyMalfunction(int.Parse(textBox4.Text));
        }
    }
}
