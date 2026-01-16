package tinhvomon.com.db;

import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

public final class ConnectDataSource {

	private static SQLServerDataSource ds;
	   private static final Properties props = new Properties();
	   
	   
	   private static String getEnvOrProp(String envKey, String propKey) {
	        String env = System.getenv(envKey);
	        if (env != null && !env.isBlank()) {
	            return env;
	        }
	        return props.getProperty(propKey);
	    }
	   
	   
	 // Load config 1 lần duy nhất
    static {
        try (InputStream input = ConnectDataSource.class
                .getClassLoader()
                .getResourceAsStream("application.properties")) {

            if (input == null) {
                throw new RuntimeException("❌ Không tìm thấy application.properties");
            }
            System.out.print("Find application.properties");
            props.load(input);
        } catch (Exception e) {
            throw new RuntimeException("❌ Lỗi load DB config", e);
        }
    }

    static {
    	  String port = getEnvOrProp("DB_PORT", "sqlserver.port");
        // ds = new SQLServerDataSource();
        // ds.setUser("sa");
        // ds.setPassword("123");
        // ds.setServerName("localhost");
        // ds.setPortNumber(1433);
        // ds.setDatabaseName("ProductDB");       
        // ds.setTrustServerCertificate(true); // 
         ds = new SQLServerDataSource();
         
        //  String dbUser = System.getenv("DB_USER");
        //  String dbPass = System.getenv("DB_PASSWORD");
        //  String dbServer = System.getenv("DB_SERVER");
        //  String dbName = System.getenv("DB_NAME");
        //  String dbPort = System.getenv("DB_PORT");
         
        //  ds.setUser(dbUser != null ? dbUser : "sa"); 
        //  ds.setPassword(dbPass); // Mật khẩu bí mật lấy từ Docker
        //  ds.setServerName(dbServer != null ? dbServer : "localhost");
        //  ds.setPortNumber(dbPort != null ? Integer.parseInt(dbPort) : 1433);
        //  ds.setDatabaseName(dbName != null ? dbName : "ProductDB");

//          ds.setUser("sa");
//        ds.setPassword("thoaivip@13");
//        ds.setServerName("103.90.225.130");
//        ds.setPortNumber(1433);
//        ds.setDatabaseName("ProductDB");       
//        ds.setEncrypt(false);              
//        ds.setTrustServerCertificate(true); 
//        ds.setLoginTimeout(10); 
//        
        
        ds.setUser(getEnvOrProp("DB_USER", "sqlserver.username"));
        ds.setPassword(getEnvOrProp("DB_PASSWORD", "sqlserver.password"));
        ds.setServerName(getEnvOrProp("DB_HOST", "sqlserver.host"));
        ds.setPortNumber(Integer.parseInt(port));
        ds.setDatabaseName(getEnvOrProp("DB_NAME", "sqlserver.database"));       
        ds.setEncrypt(false);              
        ds.setTrustServerCertificate(true); 
        ds.setLoginTimeout(10); 
         

    }

	public static SQLServerDataSource getDataSource() {
		// TODO Auto-generated method stub
		return ds;
	}   
}
