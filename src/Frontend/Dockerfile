FROM microsoft/aspnetcore:1.1
ARG source
WORKDIR /app
EXPOSE 80
EXPOSE 1433
EXPOSE 5000
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "DevPlus.Website.dll"]
