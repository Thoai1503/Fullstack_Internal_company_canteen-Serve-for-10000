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
        ds.setUser("giangthoai2000_SQLLogin_1");
        ds.setPassword("qsbnp3w54h");
        ds.setServerName("ShoeShop.mssql.somee.com");
        ds.setPortNumber(1433);
        ds.setDatabaseName("ShoeShop");       
        ds.setTrustServerCertificate(true); // 
    }

	public static SQLServerDataSource getDataSource() {
		// TODO Auto-generated method stub
		return ds;
	}   
}
