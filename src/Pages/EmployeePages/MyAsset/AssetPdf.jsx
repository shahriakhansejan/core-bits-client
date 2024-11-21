// AssetPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  header: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  section: { marginBottom: 5, fontSize: 12 },
});

const AssetPDF = ({ asset }) => (
  <Document>
    <Page style={styles.page}>
      {/* Header */}
      <Text style={styles.header}>Requested Asset Details</Text>
      <Text style={styles.subHeader}>[Your Company Name]</Text>
      
      {/* Asset Information */}
      <View style={styles.section}>
        <Text>Asset Name: {asset.asset_name}</Text>
        <Text>Asset Type: {asset.asset_type}</Text>
        <Text>Request Date: {asset.request_date}</Text>
        <Text>Approve Date: {asset.approve_date || "Not Approved"}</Text>
        <Text>Status: {asset.status}</Text>
      </View>
      
      {/* Company Information */}
      <View style={styles.companyInfo}>
        <Text>[Company Address]</Text>
        <Text>Contact: [Company Phone Number]</Text>
        <Text>Email: [Company Email]</Text>
      </View>
      
      {/* Rules and Regulations */}
      <View style={styles.rulesSection}>
        <Text>Rules & Regulations:</Text>
        <Text>1. The asset is property of [Your Company Name] and must be handled responsibly.</Text>
        <Text>2. In case of damage or loss, report immediately to the management.</Text>
        <Text>3. This asset must not be transferred without prior authorization.</Text>
        <Text>4. Violation of these rules may result in disciplinary actions.</Text>
      </View>
      
      {/* Signature Section */}
      <View style={styles.signatureField}>
        <Text>_________________________</Text>
        <Text>Authorized Signature</Text>
        <Text>Date: __________________</Text>
      </View>
    </Page>
  </Document>
);

export default AssetPDF;
