package tinhvomon.com.repository;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.Config;

@Repository
public class ConfigRepository {
	 private SQLServerDataSource sqldts;
	 
	 public ConfigRepository() {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	
      
	public Config getConfigValue(String key) {
		String sql = "SELECT type, value FROM Config WHERE [key] LIKE ?";
		try (var con = sqldts.getConnection();
		     var ps = con.prepareStatement(sql)) {
			ps.setString(1, key + "%");
			try (var rs = ps.executeQuery()) {
				if (rs.next()) {
					String type = rs.getString("type");
					String value = rs.getString("value");
					return new Config(key, type,  value);
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
}
