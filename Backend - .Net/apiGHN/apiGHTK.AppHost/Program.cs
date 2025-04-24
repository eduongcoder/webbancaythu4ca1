var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.apiGHTK>("apightk");

builder.Build().Run();
