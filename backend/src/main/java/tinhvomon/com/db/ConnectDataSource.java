package tinhvomon.com.db;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

public class ConnectDataSource {

	private static SQLServerDataSource ds;

    static {
        // ds = new SQLServerDataSource();
        // ds.setUser("sa");
        // ds.setPassword("123");
        // ds.setServerName("localhost");
        // ds.setPortNumber(1433);
        // ds.setDatabaseName("ProductDB");       
        // ds.setTrustServerCertificate(true); // 
         ds = new SQLServerDataSource();
         
         String dbUser = System.getenv("DB_USER");
         String dbPass = System.getenv("DB_PASSWORD");
         String dbServer = System.getenv("DB_SERVER");
         String dbName = System.getenv("DB_NAME");
         String dbPort = System.getenv("DB_PORT");
         
         ds.setUser(dbUser != null ? dbUser : "sa"); 
         ds.setPassword(dbPass); // Mật khẩu bí mật lấy từ Docker
         ds.setServerName(dbServer != null ? dbServer : "localhost");
         ds.setPortNumber(dbPort != null ? Integer.parseInt(dbPort) : 1433);
         ds.setDatabaseName(dbName != null ? dbName : "ProductDB");
         

    }

	public static SQLServerDataSource getDataSource() {
		// TODO Auto-generated method stub
		return ds;
	}   
}
