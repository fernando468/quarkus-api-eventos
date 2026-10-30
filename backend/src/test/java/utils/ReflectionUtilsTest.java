package utils;

import java.lang.reflect.Field;

public class ReflectionUtilsTest {

    public static void setField(Object value, Object object, String fieldName) {
        try {
            Field field = object.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(object, value);
        } catch (NoSuchFieldException | IllegalAccessException ex) {
            throw new RuntimeException(ex);
        }
    }

    public static void setFieldSuperClass(Object value, Object object, String fieldName) {
        try {
            Class<?> clazz = object.getClass();
            Field field = null;

            while (clazz != null) {
                try {
                    field = clazz.getDeclaredField(fieldName);
                    break;
                } catch (NoSuchFieldException ex) {
                    clazz = clazz.getSuperclass();
                }
            }

            if (field == null) {
                throw new NoSuchFieldException(fieldName);
            }

            field.setAccessible(true);
            field.set(object, value);

        } catch (NoSuchFieldException | IllegalAccessException ex) {
            throw new RuntimeException(ex);
        }
    }
}
