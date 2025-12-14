package tinhvomon.com.repository;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;

import tinhvomon.com.db.ConnectDataSource;
import tinhvomon.com.models.OrderStatusHistory;
import tinhvomon.com.models.User;


@Repository
public class OrderStatusHistoryRepository implements IRepo<OrderStatusHistory> {

	private SQLServerDataSource sqldts;
	public OrderStatusHistoryRepository() {
		sqldts =  ConnectDataSource.getDataSource();
	}
	@Override
	public OrderStatusHistory create(OrderStatusHistory e) throws Exception {
		// TODO Auto-generated method stub
		String sql ="insert into OrderStatusHistory (order_id,old_status,new_status,changed_by,changed_by_role,note) values (?,?,?,?,?,?)";
		try (
				java.sql.Connection con = sqldts.getConnection();
				java.sql.PreparedStatement ps = con.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS);
			){
			
			ps.setInt(1, e.getOrder_id());
            ps.setInt(2,e.getOld_status());
			ps.setInt(3,e.getNew_status());
			ps.setInt(4,e.getChanged_by());
			ps.setString(5,e.getChanged_by_role());
			ps.setString(6,e.getNote());
			
			
			int rows = ps.executeUpdate();
			System.out.println("Số dòng được chèn vào cơ sở dữ liệu: " + rows);
	         if (rows > 0) {
	             java.sql.ResultSet keys = ps.getGeneratedKeys();
	             if (keys.next()) {
	                 int id = keys.getInt(1);
	                 e.setId(id);
	                 
	                 System.out.println("ID của bản ghi mới: " + id);
	             }
	             return e;
	         }
			
		}
		catch (Exception ex) {
			throw ex;
		}
		
		return null;
	}

	@Override
	public OrderStatusHistory update(OrderStatusHistory e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public HashSet<OrderStatusHistory> getAll() {
	
		String sql ="select * from OrderStatusHistory";
		
		
		return null;
	}
	public List<OrderStatusHistory> getAllListByOrderId(int order_id) {
		
		String sql ="select o.id, o.order_id,o.old_status,o.new_status,o.old_cancellation_status,o.new_cancellation_status, o.changed_by,o.changed_by,o.changed_by_role,o.reason,o.note,o.created_at,u.email from OrderStatusHistory o join Users u on o.changed_by = u.id where order_id=? order by created_at asc";
		try
			(
				java.sql.Connection con = sqldts.getConnection();
				java.sql.PreparedStatement ps = con.prepareStatement(sql);
				
				
			
			){
			ps.setInt(1, order_id);
			
			
			java.sql.ResultSet rs = ps.executeQuery();
			List<OrderStatusHistory> list = new java.util.ArrayList<>();
			while (rs.next()) {
				User user = new User();
				user.setEmail(rs.getString("email"));
				OrderStatusHistory e = new OrderStatusHistory();
				e.setId(rs.getInt("id"));
				e.setOrder_id(rs.getInt("order_id"));
				e.setOld_status(rs.getInt("old_status"));
				e.setNew_status(rs.getInt("new_status"));
				e.setOld_cancellation_status(rs.getInt("old_cancellation_status"));
				e.setNew_cancellation_status(rs.getInt("new_cancellation_status"));
				e.setChanged_by(rs.getInt("changed_by"));
				e.setChanged_by_role(rs.getString("changed_by_role").trim());
				e.setNote(rs.getString("note"));
				e.setCreated_at(rs.getTimestamp("created_at").toLocalDateTime());
				e.setChanged_by_user(user);
				
				list.add(e);
			}
			return list;
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public OrderStatusHistory FindById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public HashSet<OrderStatusHistory> FindByKeywork(String keywork) {
		// TODO Auto-generated method stub
		return null;
	}

}
