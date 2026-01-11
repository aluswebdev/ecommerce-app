// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Logo } from '../../components/Logo';
// import { useAuth } from '../../contexts/AuthContext';

// const AuthScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     phone: '',
//     role: 'buyer',
//     businessName: '',
//     businessDescription: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const { login, register } = useAuth();

//   const handleSubmit = async () => {
//     if (!formData.email || !formData.password) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       let result;
//       if (isLogin) {
//         result = await login(formData.email, formData.password);
//       } else {
//         if (!formData.name || !formData.phone) {
//           Alert.alert('Error', 'Please fill in all required fields');
//           setLoading(false);
//           return;
//         }
//         result = await register(formData);
//       }

//       if (!result.success) {
//         Alert.alert('Error', result.error || 'Authentication failed');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setFormData({
//       email: '',
//       password: '',
//       name: '',
//       phone: '',
//       role: 'buyer',
//       businessName: '',
//       businessDescription: '',
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Logo size="large" />
//             <Text style={styles.subtitle}>
//               {isLogin ? 'Welcome back!' : 'Join Sierra Leone\'s #1 Marketplace'}
//             </Text>
//           </View>

//           {/* Form */}
//           <View style={styles.form}>
//             {!isLogin && (
//               <>
//                 <View style={styles.inputContainer}>
//                   <MaterialIcons name="person" size={20} color="#6B7280" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChangeText={(value) => handleInputChange('name', value)}
//                     autoCapitalize="words"
//                   />
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <MaterialIcons name="phone" size={20} color="#6B7280" style={styles.inputIcon} />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Phone Number (+232...)"
//                     value={formData.phone}
//                     onChangeText={(value) => handleInputChange('phone', value)}
//                     keyboardType="phone-pad"
//                   />
//                 </View>

//                 {/* Role Selection */}
//                 <View style={styles.roleContainer}>
//                   <Text style={styles.roleLabel}>I want to:</Text>
//                   <View style={styles.roleButtons}>
//                     <TouchableOpacity
//                       style={[styles.roleButton, formData.role === 'buyer' && styles.roleButtonActive]}
//                       onPress={() => handleInputChange('role', 'buyer')}
//                     >
//                       <MaterialIcons 
//                         name="shopping-cart" 
//                         size={20} 
//                         color={formData.role === 'buyer' ? '#FFFFFF' : '#6B7280'} 
//                       />
//                       <Text style={[styles.roleButtonText, formData.role === 'buyer' && styles.roleButtonTextActive]}>
//                         Buy Products
//                       </Text>
//                     </TouchableOpacity>
                    
//                     <TouchableOpacity
//                       style={[styles.roleButton, formData.role === 'seller' && styles.roleButtonActive]}
//                       onPress={() => handleInputChange('role', 'seller')}
//                     >
//                       <MaterialIcons 
//                         name="store" 
//                         size={20} 
//                         color={formData.role === 'seller' ? '#FFFFFF' : '#6B7280'} 
//                       />
//                       <Text style={[styles.roleButtonText, formData.role === 'seller' && styles.roleButtonTextActive]}>
//                         Sell Products
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 {formData.role === 'seller' && (
//                   <>
//                     <View style={styles.inputContainer}>
//                       <MaterialIcons name="business" size={20} color="#6B7280" style={styles.inputIcon} />
//                       <TextInput
//                         style={styles.input}
//                         placeholder="Business Name"
//                         value={formData.businessName}
//                         onChangeText={(value) => handleInputChange('businessName', value)}
//                       />
//                     </View>

//                     <View style={styles.inputContainer}>
//                       <MaterialIcons name="description" size={20} color="#6B7280" style={styles.inputIcon} />
//                       <TextInput
//                         style={[styles.input, styles.textArea]}
//                         placeholder="Business Description"
//                         value={formData.businessDescription}
//                         onChangeText={(value) => handleInputChange('businessDescription', value)}
//                         multiline
//                         numberOfLines={3}
//                       />
//                     </View>
//                   </>
//                 )}
//               </>
//             )}

//             <View style={styles.inputContainer}>
//               <MaterialIcons name="email" size={20} color="#6B7280" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChangeText={(value) => handleInputChange('email', value)}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <MaterialIcons name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 value={formData.password}
//                 onChangeText={(value) => handleInputChange('password', value)}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 style={styles.eyeIcon}
//                 onPress={() => setShowPassword(!showPassword)}
//               >
//                 <MaterialIcons 
//                   name={showPassword ? "visibility" : "visibility-off"} 
//                   size={20} 
//                   color="#6B7280" 
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Submit Button */}
//             <TouchableOpacity
//               style={[styles.submitButton, loading && styles.submitButtonDisabled]}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               <Text style={styles.submitButtonText}>
//                 {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
//               </Text>
//             </TouchableOpacity>

//             {/* Demo Accounts */}
//             <View style={styles.demoContainer}>
//               <Text style={styles.demoTitle}>Demo Accounts:</Text>
//               <Text style={styles.demoText}>Buyer: buyer@test.com / password</Text>
//               <Text style={styles.demoText}>Seller: seller@test.com / password</Text>
//               <Text style={styles.demoText}>Admin: admin@test.com / password</Text>
//             </View>

//             {/* Toggle Mode */}
//             <TouchableOpacity style={styles.toggleContainer} onPress={toggleMode}>
//               <Text style={styles.toggleText}>
//                 {isLogin ? "Don't have an account? " : "Already have an account? "}
//                 <Text style={styles.toggleLink}>
//                   {isLogin ? 'Sign Up' : 'Sign In'}
//                 </Text>
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingVertical: 40,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   form: {
//     flex: 1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     marginBottom: 16,
//     backgroundColor: '#F9FAFB',
//   },
//   inputIcon: {
//     marginRight: 12,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#111827',
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   eyeIcon: {
//     padding: 4,
//   },
//   roleContainer: {
//     marginBottom: 24,
//   },
//   roleLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   roleButtons: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   roleButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     backgroundColor: '#F9FAFB',
//   },
//   roleButtonActive: {
//     backgroundColor: '#1E40AF',
//     borderColor: '#1E40AF',
//   },
//   roleButtonText: {
//     marginLeft: 8,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#6B7280',
//   },
//   roleButtonTextActive: {
//     color: '#FFFFFF',
//   },
//   submitButton: {
//     backgroundColor: '#1E40AF',
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   demoContainer: {
//     marginTop: 24,
//     padding: 16,
//     backgroundColor: '#F3F4F6',
//     borderRadius: 12,
//   },
//   demoTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 8,
//   },
//   demoText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   toggleContainer: {
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   toggleText: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   toggleLink: {
//     color: '#1E40AF',
//     fontWeight: '600',
//   },
// });

// export default AuthScreen;