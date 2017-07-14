using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DevPlus.UnitTests.Common;
using DevPlus.Repositories.Interfaces;
using Moq;
using System.Collections.Generic;
using DevPlus.Repositories.Entities;
using DevPlus.Domain.Interfaces.DomainServices;
using DevPlus.Tests.Common;
using DevPlus.Domain.Models;
using DevPlus.Domain.Services.ReleaseManagement;

namespace DevPlus.Domain.Services.UnitTests
{
    [TestClass]
    public class ReleaseServiceTests
    {
        [TestInitialize]
        public void TestInit()
        {
            DependencyBuilder.Reset();

            DependencyBuilder.Factory()
                .SetupDefaults();
        }

        [TestMethod]
        [Owner("Alex")]
        [TestCategory("UnitTest")]
        public void GetTodayReleaseNote_Should_Contact_Jira_IfNoDataFoundAtDatabase()
        {
            //1. Arrange.
            var releaseNoteModel = ReleaseNoteModelBuilder.Factory()
                .WithAssignee("Alex.Sun")
                .WithLabel("20170713")
                .WithPriority("Highest")
                .Build();

            var releaseNoteModelList = new List<ReleaseNoteModel>();
            releaseNoteModelList.Add(releaseNoteModel);

            var releaseServiceMock = new Mock<IReleaseService>();
            //releaseServiceMock.Setup(x => x.GetTodayReleaseNoteFromDb()).Returns(releaseNoteModelList);
            //releaseServiceMock.Setup(x => x.GetTodayReleaseNoteFromJira()).Returns(releaseNoteModelList);

            var testServiceMock = new Mock<ITestService>();
            testServiceMock.Setup(x => x.Echo("Hello")).Returns("GoodBye123");

            DependencyBuilder.Factory()
                .SetupDefaults()
                .Bind<Mock<ITestService>,ITestService>(testServiceMock.Object);

            //2. Act
            //var sut = releaseServiceMock.Object;
            var sut = new ReleaseService();

            //var sut = CoreServiceLocator.Current.GetInstance<IReleaseService>();
            var test = sut.GetTodayReleaseNote();

            //3. Assert
            releaseServiceMock.Verify(m => m.GetTodayReleaseNoteFromJira(),
                Times.Never,
                "If system found data at database, it should not fetch data from JIRA"
                );
        }
    }
}
