package tinhvomon.com.repository;

import java.sql.SQLException;
import java.util.HashSet;

public interface IRepo<T>  {

 	T create (T e) throws Exception ;
 	T update (T e);
 	boolean delete (int id);
 	HashSet<T> getAll();
	
    T FindById(int id);
    HashSet<T> FindByKeywork(String keywork);
}
