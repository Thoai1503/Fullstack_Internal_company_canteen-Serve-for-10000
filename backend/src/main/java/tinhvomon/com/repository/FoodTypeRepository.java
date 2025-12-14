package tinhvomon.com.repository;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.HashSet;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import tinhvomon.com.db.ConnectDataSource;
//import tinhvomon.com.utils.HibernateUtil;
import tinhvomon.com.models.FoodItem;
import tinhvomon.com.models.FoodType;


@Repository
@Transactional
public class FoodTypeRepository implements IRepo<FoodType> 	 {

	
	 private SQLServerDataSource sqldts;
	 public FoodTypeRepository () {
		 sqldts = ConnectDataSource.getDataSource();
	 }
	 @PersistenceContext
	    private EntityManager em;


	@Override
	public FoodType create(FoodType e) {
		// TODO Auto-generated method stub
			try {
			 em.persist(e);
				        return e;}
			catch(Exception ex) {
				throw ex;
			}
	}

	@Override
	public FoodType update(FoodType e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public HashSet<FoodType> getAll() {
	
		    HashSet<FoodType> result = new HashSet<>();
			String sql = "SELECT * FROM FoodType";
		   
			try(Connection con = sqldts.getConnection();
	             PreparedStatement ps = con.prepareStatement(sql)) {
				  ResultSet rs =	ps.executeQuery();
			        ResultSetMetaData metaData = rs.getMetaData();
			        int columnCount = metaData.getColumnCount();
			        while (rs.next()) {
			            // In tất cả cột trong 1 hàng
			            for (int i = 1; i <= columnCount; i++) {
			                String columnName = metaData.getColumnName(i);
			                Object value = rs.getObject(i);
			                System.out.print(columnName + "=" + value + " | ");
			            }
			          //  System.out.println( "Type: " +rs.getString("typeName"));

			            // Nếu muốn tạo đối tượng FoodItem từ rs
			            FoodType item = new FoodType();
			            item.setId(rs.getInt("id"));
			            item.setName(rs.getString("name"));
			            item.setSlug(rs.getString("slug"));

			            result.add(item);
			        }

			        return result;
				 
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			
			return null;
		
	}

	@Override
	public FoodType FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashSet<FoodType> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
