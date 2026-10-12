package utils;

import java.lang.reflect.Field;

public class ReflectionUtilsTest{

    public static void setField(Object value, Object object, String fieldName) throws NoSuchFieldException, IllegalAccessException {
        Field field = object.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(object, value);
    }
}
