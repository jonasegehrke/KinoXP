# KinoXP
 ```
For local use:
Remove dependency from pom.xml:
<dependency>
            <groupId>com.microsoft.sqlserver</groupId>
            <artifactId>mssql-jdbc</artifactId>
            <version>9.4.0.jre11</version> <!-- Change this to jre16 for project testing -->
 </dependency>```
    

For use with azure SQL server keep (Look at the comment for local run):
```<dependency>
            <groupId>com.microsoft.sqlserver</groupId>
            <artifactId>mssql-jdbc</artifactId>
            <version>9.4.0.jre11</version> <!-- Change this to your JRE version if run locally -->
</dependency>```
    
Make sure to change packaging to jar if run locally 
<packaging>jar</packaging>


Deployed version:
https://calm-water-0b7c77d03.azurestaticapps.net/index.html
Be aware that the REST Api takes up to 5 minutes to start up if you visit the site and it hasnt been opened for a while. This is simply because of azure free tier policy.
