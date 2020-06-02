package com.partiu

import android.view.View
import android.view.ViewManager
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import java.util.*


class CustomToastPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<com.facebook.react.uimanager.ViewManager<View, ReactShadowNode<*>>> {
        return Collections.emptyList()
    }


    override fun createNativeModules(
            reactContext: ReactApplicationContext): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(ToastModule(reactContext))
        return modules
    }
}