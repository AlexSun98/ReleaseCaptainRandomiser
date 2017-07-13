using DevPlus.Domain.Interfaces.DomainServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevPlus.Domain.Services.ReleaseManagement
{
    public class TestService : ITestService
    {
        public string Echo(string message)
        {
            Console.WriteLine(message);
            return message;
        }
    }
}
